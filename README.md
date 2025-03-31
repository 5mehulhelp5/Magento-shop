```markdown
# 🛒 Magento Purchase Flow Test Suite

## 📌 Overview  
This test suite automates end-to-end tests for the Magento purchase flow using **Playwright**.

### **🔹 Features**
- ✅ Automated E2E tests for key purchase flow scenarios  
- ✅ CI/CD integration via **GitHub Actions**  
- ✅ Docker support for local execution  
- ✅ HTML, JSON & JUnit test reports  
- ✅ Test coverage report  

---

## **📜 Test Scenarios**  

### 🟢 **Positive Test Cases**
1. ✅ **Successful purchase completion**  
2. 📦 **Handling multiple items in the cart with a successful purchase**  
3. 🔄 **Item removal from cart works correctly**  
4. 🔍 **Sorting products by name and price**  
5. 🚀 **Navigation through categories**  
6. 🛠️ **Post-purchase account registration**  

### 🔴 **Negative Test Cases**
7. ❌ **Card rejection (invalid payment method)**  
8. 🚫 **Checkout blocked if shipping details are missing**  
9. 🛒 **Empty cart validation before checkout**  
10. 💳 **Invalid card authentication fails**  

---

## **🚀 Setup & Execution**  

### **1️⃣ Install Dependencies**
```sh
npm install
```

### **2️⃣ Run Tests**
```sh
npx playwright test
```

### **3️⃣ Run Tests in Debug Mode**
```sh
npx playwright test --debug
```

### **4️⃣ View HTML Test Report**
```sh
npx playwright show-report
```

---

## **🐳 Docker Setup (Local Only)**

### **1️⃣ Add These Docker Files (Do Not Push to GitHub)**

#### **📄 `Dockerfile`**
```dockerfile
# Use the official Playwright image
FROM mcr.microsoft.com/playwright:v1.51.1-jammy

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the test suite
COPY . .

# Set Playwright environment variables (optional)
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Run Playwright tests when the container starts
CMD ["npx", "playwright", "test"]
```

#### **📄 `docker-compose.yml`**
```yaml
version: '3.8'

services:
  tests:
    build: .
    container_name: playwright-tests
    volumes:
      - .:/app
    working_dir: /app
    command: ["npx", "playwright", "test"]
```

---

### **2️⃣ Ignore Docker Files in Git**  
Add the following to **`.gitignore`**:
```
# Ignore Docker configuration files
Dockerfile
docker-compose.yml
```

---

### **3️⃣ Build & Run Docker Locally**  

#### **📦 1️⃣ Build Docker Image**
```sh
docker build -t node-playwright-tests .
```

#### **▶ 2️⃣ Run Tests in Docker**
```sh
docker run --rm node-playwright-tests
```

#### **📦 3️⃣ Using Docker Compose**
```sh
docker-compose up --build
```

---

## **🤖 CI/CD (GitHub Actions)**
This repository includes **GitHub Actions** to run tests automatically on **each push or pull request**.

---

## **📊 Test Coverage Report**
Playwright includes built-in test coverage analysis.

### **Generate & View Coverage**
```sh
npx playwright test --coverage
npx playwright show-report
```

---

## **📌 Why No Docker in CI/CD?**
- **GitHub Actions already runs Playwright inside a container** → No need for extra Docker setup.  
- **Faster execution** → Running directly in **Ubuntu runner** is faster than nested containers.  

---

## **🛠️ Troubleshooting**
### **Fix Stuck Browsers**
```sh
npx playwright install --with-deps
```

### **Run a Single Test File**
```sh
npx playwright test tests/magentoPurchase.spec.js
```
