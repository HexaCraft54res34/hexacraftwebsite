from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import math

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ---------- MODELS ----------

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    created_at: str
    email_sent: bool

class CalculatorRequest(BaseModel):
    players: int = Field(ge=1, le=500)
    server_type: str = Field(pattern="^(vanilla|light_plugins|heavy_plugins|modded)$")
    performance_level: str = Field(pattern="^(budget|performance)$")

class CalculatorResponse(BaseModel):
    recommended_ram: int
    recommended_cpu: int
    suggested_plan: str
    plan_tier: str
    price: int
    upgrade_warning: Optional[str] = None

# ---------- PLANS DATA ----------

BUDGET_PLANS = [
    {"name": "Dirt", "ram": 2, "cpu": 100, "storage": 10, "price": 20},
    {"name": "Stone", "ram": 4, "cpu": 200, "storage": 20, "price": 40},
    {"name": "Iron", "ram": 8, "cpu": 300, "storage": 30, "price": 80},
    {"name": "Redstone", "ram": 16, "cpu": 400, "storage": 40, "price": 160},
    {"name": "Gold", "ram": 32, "cpu": 450, "storage": 40, "price": 320},
    {"name": "Emerald", "ram": 48, "cpu": 500, "storage": 50, "price": 480},
    {"name": "Netherite", "ram": 64, "cpu": 700, "storage": 60, "price": 640},
]

PERFORMANCE_PLANS = [
    {"name": "Performance Dirt", "ram": 2, "cpu": 100, "storage": 10, "price": 40},
    {"name": "Performance Stone", "ram": 4, "cpu": 200, "storage": 20, "price": 80},
    {"name": "Performance Iron", "ram": 8, "cpu": 300, "storage": 30, "price": 160},
    {"name": "Performance Redstone", "ram": 16, "cpu": 400, "storage": 40, "price": 320},
    {"name": "Performance Gold", "ram": 32, "cpu": 450, "storage": 40, "price": 640},
    {"name": "Performance Emerald", "ram": 48, "cpu": 500, "storage": 50, "price": 960},
    {"name": "Performance Netherite", "ram": 64, "cpu": 700, "storage": 60, "price": 1280},
]

BUDGET_SPECS = {
    "processor": "Intel Platinum 8269-CY",
    "memory": "128GB DDR4 3200MHz",
    "storage": "NVMe SSD Storage",
    "uptime": "80% Uptime Guarantee",
}

PERFORMANCE_SPECS = {
    "processor": "AMD EPYC 9354P",
    "memory": "256GB DDR5 5400MHz",
    "storage": "NVMe SSD Storage",
    "uptime": "100% Uptime Guarantee",
}

RAM_MULTIPLIER = {
    "vanilla": 0.5,
    "light_plugins": 0.75,
    "heavy_plugins": 1.0,
    "modded": 1.5,
}

CPU_MULTIPLIER = {
    "vanilla": 5,
    "light_plugins": 7.5,
    "heavy_plugins": 10,
    "modded": 15,
}

# ---------- ROUTES ----------

@api_router.get("/")
async def root():
    return {"message": "HexaCraft API"}

@api_router.get("/plans")
async def get_plans():
    return {
        "budget": {"plans": BUDGET_PLANS, "specs": BUDGET_SPECS},
        "performance": {"plans": PERFORMANCE_PLANS, "specs": PERFORMANCE_SPECS},
    }

@api_router.post("/calculator", response_model=CalculatorResponse)
async def calculate_plan(req: CalculatorRequest):
    base_ram = 2
    ram_needed = base_ram + math.ceil(req.players * RAM_MULTIPLIER[req.server_type])
    cpu_needed = math.ceil(req.players * CPU_MULTIPLIER[req.server_type])

    # Round RAM to nearest plan tier
    ram_tiers = [2, 4, 8, 16, 32, 48, 64]
    recommended_ram = 2
    for t in ram_tiers:
        if t >= ram_needed:
            recommended_ram = t
            break
    else:
        recommended_ram = 64

    plans = PERFORMANCE_PLANS if req.performance_level == "performance" else BUDGET_PLANS
    suggested = None
    for p in plans:
        if p["ram"] >= recommended_ram and p["cpu"] >= cpu_needed:
            suggested = p
            break

    upgrade_warning = None
    if not suggested:
        suggested = plans[-1]
        upgrade_warning = "Your requirements exceed our standard plans. Consider contacting us for a custom solution."

    return CalculatorResponse(
        recommended_ram=recommended_ram,
        recommended_cpu=cpu_needed,
        suggested_plan=suggested["name"],
        plan_tier=req.performance_level,
        price=suggested["price"],
        upgrade_warning=upgrade_warning,
    )

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(form: ContactForm):
    doc = {
        "id": str(uuid.uuid4()),
        "name": form.name,
        "email": form.email,
        "subject": form.subject,
        "message": form.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "email_sent": False,
    }

    await db.contacts.insert_one(doc)

    email_sent = False
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [form.email],
            "subject": f"HexaCraft - We received your message: {form.subject}",
            "html": f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0F14; color: #E0E6ED; padding: 32px; border-radius: 8px;">
                <h1 style="color: #00F0FF; margin-bottom: 16px;">HexaCraft Support</h1>
                <p>Hi {form.name},</p>
                <p>We have received your message and will get back to you within 24 hours.</p>
                <hr style="border-color: #1E293B; margin: 24px 0;" />
                <p style="color: #888;"><strong>Your message:</strong></p>
                <p style="color: #aaa;">{form.message}</p>
                <hr style="border-color: #1E293B; margin: 24px 0;" />
                <p style="color: #666; font-size: 12px;">HexaCraft - Premium Minecraft Hosting</p>
            </div>
            """,
        }
        await asyncio.to_thread(resend.Emails.send, params)
        email_sent = True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")

    await db.contacts.update_one({"id": doc["id"]}, {"$set": {"email_sent": email_sent}})

    return ContactResponse(
        id=doc["id"],
        name=doc["name"],
        email=doc["email"],
        subject=doc["subject"],
        message=doc["message"],
        created_at=doc["created_at"],
        email_sent=email_sent,
    )

@api_router.get("/faqs")
async def get_faqs():
    return [
        {"question": "Which plan should I choose?", "answer": "It depends on your server type and player count. Use our Plan Calculator to get a personalized recommendation. For vanilla servers with under 20 players, our Budget Iron plan works great. For modded servers or larger communities, consider Performance plans."},
        {"question": "Do you support modded Minecraft?", "answer": "Yes! We fully support Forge, Fabric, and all popular modpacks. Our Performance plans are optimized for modded servers with DDR5 memory and AMD EPYC processors for maximum TPS."},
        {"question": "What happens if I exceed player limits?", "answer": "Your server will continue running but may experience reduced TPS (ticks per second). We recommend upgrading your plan before hitting capacity. You can upgrade instantly from the Pterodactyl panel with zero downtime."},
        {"question": "Is DDoS protection included?", "answer": "Yes, all plans include advanced DDoS protection at no extra cost. We provide Layer 3/4 and Layer 7 protection with automatic attack detection and zero-downtime mitigation."},
        {"question": "How fast is setup?", "answer": "Instant! Your server is provisioned automatically within seconds of payment. You'll receive Pterodactyl panel access immediately and can start configuring your server right away."},
        {"question": "Do you provide refunds?", "answer": "Yes, we offer refunds within 48 hours of purchase if the service does not meet the advertised specifications. Please review our Refund Policy page for full details on eligibility and the request process."},
        {"question": "Can I change my server version?", "answer": "Absolutely! Through the Pterodactyl panel, you can switch between Paper, Spigot, Forge, Fabric, and other server software with just a few clicks."},
        {"question": "What panel do you use?", "answer": "We use Pterodactyl Panel, an open-source game server management panel. It provides a clean web interface for file management, console access, plugin installation, backups, and more."},
    ]

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
