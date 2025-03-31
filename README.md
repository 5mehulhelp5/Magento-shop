```markdown
# Magento Purchase Flow Test Suite

## Overview  
This test suite automates end-to-end tests for the Magento purchase flow using **Playwright**.

## Test Scenarios Covered  

1. ✅ Successful purchase completion  
2. 📦 Handling multiple items in cart with successful purchase  
3. 🔄 Item removal from cart works correctly  
4. 💳 Card rejection  
5. ❌ Invalid card authentication fails  
6. 🚫 Checkout blocked if shipping details are missing  
7. 🛒 Empty cart validation before checkout  

## 📌 Setup & Execution  

### **1️⃣ Install Dependencies**  
```bash
npm install
```

### **2️⃣ Run Tests**  
```bash
npx playwright test
```

### **3️⃣ View Test Report**  
```bash
npx playwright show-report
```

### **4️⃣ Run Tests in Docker**  
```bash
docker-compose up --build
```

## 🤖 CI/CD Integration  
This repository includes GitHub Actions to run the tests automatically on each push or pull request.
