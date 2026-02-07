# HexaCraft - PRD

## Problem Statement
Build a modern, responsive Full Stack Showcase Website for a Minecraft Hosting & VPS company named "HexaCraft" with dark gaming theme, 11 pages, interactive calculator, and contact form with email integration.

## User Personas
- **Casual Minecraft Players**: Looking for affordable hosting
- **Content Creators/Streamers**: Need reliable performance plans
- **Community Server Admins**: Running SMP/network servers
- **Modded Server Owners**: Running Forge/Fabric modpacks
- **Educators/Parents**: Safe Minecraft environments

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI + Framer Motion
- **Backend**: FastAPI + Motor (MongoDB async) + Resend (email)
- **Database**: MongoDB
- **Design**: Dark theme (#050505) with cyan (#00F0FF) accents, Oxanium + Outfit fonts

## What's Been Implemented (Feb 7, 2026)
- 11 fully functional pages: Home, What We Do, Who It's For, Plans, Calculator, Pterodactyl, DDoS, FAQ, Refund Policy, Terms, Contact
- Backend APIs: /api/plans, /api/calculator, /api/faqs, /api/contact
- Interactive plan calculator with dynamic recommendations
- Contact form with Resend email integration
- Responsive navbar with mobile hamburger menu
- Glass-morphism cards, neon glow effects, grid background
- Budget/Performance plan tabs with specs bar
- FAQ accordion from shadcn
- Full footer with navigation links

## P0 (Done)
- All 11 pages functional
- Plan calculator working
- Contact form with email
- Responsive design
- API-driven content

## P1 (Backlog)
- Payment gateway integration (Stripe/Razorpay)
- Blog/news section
- Live chat support widget
- Server status monitoring page

## P2 (Future)
- User account dashboard
- Automated server provisioning
- Analytics dashboard for admins
- Multi-language support
