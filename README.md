# Coupon Management API 🎟️

A lightweight and rule-based backend service built for e-commerce coupon handling.  
This API allows creating coupons and returns the **best matching coupon** for a specific user  
by evaluating eligibility rules such as user tier, cart value, discount type, validity, etc.

---

## 🚀 Live Demo

Base URL:  
https://coupon-manage.onrender.com

Test:

curl https://coupon-manage.onrender.com

Expected:
Coupon API running

🛠️ Tech Stack
Component	Technology
Backend:	Node.js + Express
Data Storage:	In-memory store
Deployment:	Render

📡 API Endpoints
1️⃣ Create Coupon
POST /coupon

🧪 Sample (CMD/Terminal):
curl -X POST https://coupon-manage.onrender.com/coupon -H "Content-Type: application/json" -d "{\"code\":\"WEB100\",\"discountType\":\"FLAT\",\"discountValue\":100,\"startDate\":\"2024-01-01\",\"endDate\":\"2026-12-31\"}"

2️⃣ Get Best Applicable Coupon
POST /best-coupon

🧪 Sample Test:
curl -X POST https://coupon-manage.onrender.com/best-coupon -H "Content-Type: application/json" -d "{\"user\":{\"userId\":\"u1\",\"userTier\":\"NEW\",\"country\":\"IN\",\"lifetimeSpend\":0,\"ordersPlaced\":0},\"cart\":{\"items\":[{\"productId\":\"p1\",\"category\":\"electronics\",\"unitPrice\":600,\"quantity\":1}]}}"
📌 Sample Response:
{
  "bestCoupon": {
    "code": "WEB100",
    "discountType": "FLAT",
    "discountValue": 100
  },
  "discount": 100
}

🧑‍💻 How to Run Locally
git clone https://github.com/atharvac1204/Coupon_Manage.git
cd Coupon_Manage
npm install
npm run dev
Server runs locally on:
http://localhost:3000

📂 Project Structure
coupon-management-api/
 ├─ src/
 │  ├─ index.js
 │  ├─ couponStore.js
 │  ├─ couponService.js
 │  ├─ demoData.js
 ├─ package.json
 ├─ README.md


🔐 Demo Login Requirement
Assignment asked for:
Email: hire-me@anshumat.org
Password: HireMe@2025!
🔹 Since this API has no authentication, no login is required.
🔹 Example user context is included in test scenarios.

