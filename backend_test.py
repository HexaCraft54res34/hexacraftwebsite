import requests
import json
import sys
from datetime import datetime

class HexaCraftAPITester:
    def __init__(self, base_url="https://hexacraft-preview.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_result(self, test_name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            status = "✅ PASS"
        else:
            status = "❌ FAIL"
        
        result = f"{status} - {test_name}"
        if details:
            result += f" - {details}"
        
        print(result)
        self.test_results.append({
            "name": test_name,
            "success": success,
            "details": details
        })
        return success

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/", timeout=10)
            success = response.status_code == 200 and "HexaCraft API" in response.json().get("message", "")
            return self.log_result("API Root", success, f"Status: {response.status_code}")
        except Exception as e:
            return self.log_result("API Root", False, f"Error: {str(e)}")

    def test_get_plans(self):
        """Test plans endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/plans", timeout=10)
            success = False
            details = f"Status: {response.status_code}"
            
            if response.status_code == 200:
                data = response.json()
                # Check structure
                if ("budget" in data and "performance" in data and 
                    "plans" in data["budget"] and "specs" in data["budget"] and
                    "plans" in data["performance"] and "specs" in data["performance"]):
                    
                    budget_plans = data["budget"]["plans"]
                    perf_plans = data["performance"]["plans"]
                    
                    # Verify we have plans
                    if len(budget_plans) > 0 and len(perf_plans) > 0:
                        # Check a few plan structure
                        plan = budget_plans[0]
                        if all(key in plan for key in ["name", "ram", "cpu", "storage", "price"]):
                            success = True
                            details += f" - Budget plans: {len(budget_plans)}, Performance plans: {len(perf_plans)}"
                        else:
                            details += " - Missing required plan fields"
                    else:
                        details += " - No plans found"
                else:
                    details += " - Invalid response structure"
            
            return self.log_result("Get Plans", success, details)
        except Exception as e:
            return self.log_result("Get Plans", False, f"Error: {str(e)}")

    def test_calculator_budget_vanilla(self):
        """Test calculator endpoint with budget vanilla settings"""
        try:
            payload = {
                "players": 10,
                "server_type": "vanilla",
                "performance_level": "budget"
            }
            response = requests.post(f"{self.base_url}/api/calculator", json=payload, timeout=10)
            success = False
            details = f"Status: {response.status_code}"
            
            if response.status_code == 200:
                data = response.json()
                # Check required fields
                required_fields = ["recommended_ram", "recommended_cpu", "suggested_plan", "plan_tier", "price"]
                if all(field in data for field in required_fields):
                    success = True
                    details += f" - RAM: {data['recommended_ram']}GB, CPU: {data['recommended_cpu']}%, Plan: {data['suggested_plan']}, Price: ₹{data['price']}"
                else:
                    details += " - Missing required response fields"
            
            return self.log_result("Calculator Budget Vanilla", success, details)
        except Exception as e:
            return self.log_result("Calculator Budget Vanilla", False, f"Error: {str(e)}")

    def test_calculator_performance_modded(self):
        """Test calculator endpoint with performance modded settings"""
        try:
            payload = {
                "players": 50,
                "server_type": "modded",
                "performance_level": "performance"
            }
            response = requests.post(f"{self.base_url}/api/calculator", json=payload, timeout=10)
            success = False
            details = f"Status: {response.status_code}"
            
            if response.status_code == 200:
                data = response.json()
                # Check required fields
                required_fields = ["recommended_ram", "recommended_cpu", "suggested_plan", "plan_tier", "price"]
                if all(field in data for field in required_fields):
                    # Verify it's performance tier
                    if data["plan_tier"] == "performance":
                        success = True
                        details += f" - RAM: {data['recommended_ram']}GB, CPU: {data['recommended_cpu']}%, Plan: {data['suggested_plan']}, Price: ₹{data['price']}"
                    else:
                        details += f" - Wrong tier returned: {data['plan_tier']}"
                else:
                    details += " - Missing required response fields"
            
            return self.log_result("Calculator Performance Modded", success, details)
        except Exception as e:
            return self.log_result("Calculator Performance Modded", False, f"Error: {str(e)}")

    def test_calculator_edge_case(self):
        """Test calculator with edge case (high player count)"""
        try:
            payload = {
                "players": 150,
                "server_type": "heavy_plugins",
                "performance_level": "budget"
            }
            response = requests.post(f"{self.base_url}/api/calculator", json=payload, timeout=10)
            success = False
            details = f"Status: {response.status_code}"
            
            if response.status_code == 200:
                data = response.json()
                # For high player count, should recommend highest tier with possible warning
                if "suggested_plan" in data and "price" in data:
                    success = True
                    warning = " (with upgrade warning)" if data.get("upgrade_warning") else ""
                    details += f" - Plan: {data['suggested_plan']}, Price: ₹{data['price']}{warning}"
                else:
                    details += " - Missing plan recommendation"
            
            return self.log_result("Calculator Edge Case", success, details)
        except Exception as e:
            return self.log_result("Calculator Edge Case", False, f"Error: {str(e)}")

    def test_get_faqs(self):
        """Test FAQ endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/faqs", timeout=10)
            success = False
            details = f"Status: {response.status_code}"
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    # Check first FAQ structure
                    faq = data[0]
                    if "question" in faq and "answer" in faq:
                        success = True
                        details += f" - {len(data)} FAQs returned"
                    else:
                        details += " - Invalid FAQ structure"
                else:
                    details += " - No FAQs returned or invalid format"
            
            return self.log_result("Get FAQs", success, details)
        except Exception as e:
            return self.log_result("Get FAQs", False, f"Error: {str(e)}")

    def test_contact_form(self):
        """Test contact form submission"""
        try:
            payload = {
                "name": "Test User",
                "email": "test@example.com",
                "subject": "API Test",
                "message": "This is an automated test of the contact form API."
            }
            response = requests.post(f"{self.base_url}/api/contact", json=payload, timeout=15)
            success = False
            details = f"Status: {response.status_code}"
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "name", "email", "subject", "message", "created_at", "email_sent"]
                if all(field in data for field in required_fields):
                    success = True
                    email_status = "email sent" if data["email_sent"] else "email not sent"
                    details += f" - Contact saved with ID: {data['id'][:8]}..., {email_status}"
                else:
                    details += " - Missing required response fields"
            
            return self.log_result("Contact Form", success, details)
        except Exception as e:
            return self.log_result("Contact Form", False, f"Error: {str(e)}")

    def run_all_tests(self):
        """Run all API tests"""
        print("🔥 Starting HexaCraft Backend API Testing...\n")
        
        # Test all endpoints
        self.test_api_root()
        self.test_get_plans()
        self.test_calculator_budget_vanilla()
        self.test_calculator_performance_modded()
        self.test_calculator_edge_case()
        self.test_get_faqs()
        self.test_contact_form()
        
        # Print summary
        print(f"\n📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        success_rate = (self.tests_passed / self.tests_run) * 100
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All API tests passed!")
            return True
        else:
            print("⚠️  Some API tests failed. Check details above.")
            return False

def main():
    tester = HexaCraftAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())