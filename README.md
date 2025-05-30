
# 🚀 Task Management (MERN Stack test)  

## ▶️ Run and test the application

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/baymaxfpo/taskflow-test.git 
cd taskflow
```

### 2️⃣ Install Frontend Dependencies  
```sh
npm install
```

### 3️⃣ (If you have docker installed) Run Docker Compose file
```sh
docker compose up -d
```

### 4️⃣ Install Backend Dependencies  
```sh
cd server
npm install
```

### 5️⃣ Setup Environment Variables  
Create a **.env** file inside the `/server` folder and add:  
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### 6️⃣ Run The Backend
```sh
node server/index.js
```

### 7️⃣ Open Another Terminal Window And Setup Environment Variables
Create a **.env.localDev** file inside the root folder and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
VITE_API_URL=http://localhost:5000
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```
do the same for **.env** and **.env.development** files

### 8️⃣ Run The Frontend
```sh
// Run in local environment (recommended)
npm run client:local

// Run in development environment
npm run client:dev

// Run in default environment
npm run client
```

### 9️⃣ Test the application
visit http://localhost:5173/

---

## 🛠 Installation & Setup  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/baymaxfpo/taskflow-test.git 
cd taskflow
```

### 2️⃣ Install Dependencies  

#### 📌 Frontend  
```sh
npm install
```

#### 📌 Backend  
```sh
cd server
npm install
```

### 3️⃣ Setup Environment Variables  
Create a **.env** file inside the `/server` folder and add:  
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### 4️⃣ Start the Application  

#### 🚀 Start Backend Server  
```sh
for local environment
cd server
node src/index.js
backend deployed on render
```

#### 🚀 Start Frontend Development Server  
```sh
npm run dev
```
---
