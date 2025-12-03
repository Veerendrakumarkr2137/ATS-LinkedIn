# 🚀 ATS + LinkedIn Analyzer (MERN Full-Stack Project)

A full-stack MERN application that analyzes **Resumes (PDF/DOCX)** and **LinkedIn profile content**, calculates ATS scores, identifies missing keywords, and provides optimization suggestions.  
Includes **User Authentication**, ATS scoring logic, LinkedIn analyzer, protected routes, and cloud-ready backend and frontend.

---

## 📌 Features

### 🔐 **Authentication**
- User Registration & Login (JWT)
- Protected API routes
- Secure password hashing (bcrypt)

### 📄 **Resume ATS Analyzer**
- Upload **PDF or DOCX**
- Extract text using pdf-parse & mammoth
- Keyword-based ATS scoring
- Suggestions for improvement
- History of analyses (MongoDB stored)

### 💼 **LinkedIn Profile Analyzer**
- User enters headline, skills, about, experience
- Score + suggestions
- Strengthens LinkedIn profile optimization
- Stores history for the user

### 🖥️ **Frontend**
- React + Context API
- Protected pages (Resume, LinkedIn, Dashboard)
- Beautiful pink/gradient theme
- File upload interface
- Responsive UI with animations

### 🗄️ **Backend**
- Node.js + Express
- MongoDB (Local or Atlas)
- Clean MVC structure
- Multer for file uploads
- JWT auth middleware
- ATS scoring engine (`atsScorer.js`)

---

## 📂 Folder Structure
ATS+LINKEDIN/
│── backend/
│ ├── config/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── server.js
│ ├── .env
│
└── frontend/
├── src/
├── components/
├── context/
├── pages/
├── App.js
├── api.js


---

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- React Router  
- Context API  
- Axios  
- CSS / Custom UI  

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Multer  
- pdf-parse  
- mammoth  
- bcryptjs  
- jsonwebtoken  

---

## ⚙️ Installation & Setup

### 🔹 Clone repository
git clone https://github.com/your-username/ATS-LinkedIn.git

cd ATS-LinkedIn
cd backend
npm install
npm start

(in bash)
Create `.env`:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ats_linkedin
JWT_SECRET=yourjwtsecret
FRONTEND_URL=http://localhost:3000

cd frontend
npm install
npm start


---

## 🔍 API Endpoints

### **Authentication**
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/api/auth/register` | Create user |
| POST | `/api/auth/login` | Login user |
| GET  | `/api/auth/me` | Get logged-in user |

### **Resume**
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/api/resume/analyze` | Upload & analyze resume |
| GET  | `/api/resume/history` | Fetch user history |

### **LinkedIn**
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/api/linkedin/analyze` | Analyze LinkedIn data |
| GET  | `/api/linkedin/history` | Fetch user history |

---

## 🧠 How ATS Scoring Works

The ATS scoring engine checks:

✔ Keywords match  
✔ Resume structure (Experience, Skills, Education)  
✔ Word count  
✔ Action verbs  
✔ Technical skills  
✔ Missing keywords → suggestions  

---

### Images
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 63f6215e (changes)

***1. LOGIN PAGE***
![image alt](https://github.com/Veerendrakumarkr2137/ATS-LinkedIn/blob/main/Login%20page.png)

***2. HOME PAGE***
![image alt](https://github.com/Veerendrakumarkr2137/ATS-LinkedIn/blob/main/Home_Page.png)

***3. ATS RESUME SCORE PAGE***
![image alt](https://github.com/Veerendrakumarkr2137/ATS-LinkedIn/blob/main/Resume_tool.png)

***4. ATS LINKEDIN PAGE***
![image alt](https://github.com/Veerendrakumarkr2137/ATS-LinkedIn/blob/main/Linkedin_tool.png)
=======
1.frontpage 
![alt text](image.png)
>>>>>>> c9d15b96 (first)

---

## 👨‍💻 Author

**Veerendra Kumar KR**  
*MERN Stack Developer*  
GitHub: https://github.com/Veerendrakumarkr2137  

---

## ⭐ If you like this project  
Please give it a **GitHub star ⭐**  

