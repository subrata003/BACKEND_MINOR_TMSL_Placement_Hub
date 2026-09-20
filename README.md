# BACKEND_MINOR_TMSL_Placement_Hub

# 🎓 Placement Hub

Placement Hub is a web-based **college placement management system** designed to manage the complete placement process between **Admin/TPO and Students** through a centralized platform.

The system allows administrators to manage placement opportunities, students, applications, shortlisting, placement drives, interviews, results, and placement records, while students can manage their profiles and participate in placement activities.

---

## 🚀 Project Overview

The main objective of Placement Hub is to digitize and simplify the college placement process.

### Placement Workflow

```text
Student Profile
      ↓
Job / Placement Opportunity
      ↓
Eligibility Check
      ↓
Application
      ↓
Shortlisting
      ↓
Placement Drive
      ↓
Interview
      ↓
Result
      ↓
Placement
      ↓
Reports
```

---

## 👥 User Roles

The application has **two roles**:

### 👨‍💼 Admin

Admin/TPO manages the complete placement process.

**Responsibilities:**

* Manage students
* Manage student profiles
* Create placement opportunities
* Update and delete jobs
* Define eligibility criteria
* View student applications
* Shortlist students
* Manage placement drives
* Manage interview rounds
* Update interview results
* Manage placement records
* View placement statistics and reports

### 👨‍🎓 Student

Students can participate in placement activities through their account.

**Features:**

* Register and login
* Manage personal profile
* Add academic details
* Add skills
* View placement opportunities
* Check eligibility
* Apply for jobs
* Track application status
* View shortlisted opportunities
* View placement drive information
* View interview status
* View results
* View placement status

---

# ✨ Key Features

## 🔐 Authentication

* User registration
* User login
* Password hashing using bcrypt
* JWT-based authentication
* Protected routes
* Role-based authorization
* Admin and Student access control

---

## 👨‍💼 Admin Features

```text
Admin Login
     ↓
Admin Dashboard
     ↓
┌─────────────────────────────┐
│ Student Management          │
│ Job Management              │
│ Application Management      │
│ Shortlisting                │
│ Placement Drive Management  │
│ Interview Management        │
│ Result Management           │
│ Placement Management        │
│ Reports                     │
└─────────────────────────────┘
```

---

## 👨‍🎓 Student Features

```text
Student Login
     ↓
Student Dashboard
     ↓
┌─────────────────────────────┐
│ Profile                     │
│ Academic Details            │
│ Skills                      │
│ Placement Opportunities     │
│ Applications                │
│ Shortlisted Jobs            │
│ Interviews                  │
│ Results                     │
│ Placement Status            │
└─────────────────────────────┘
```

---

# 🛠️ Technology Stack

### Frontend

* React.js
* JavaScript / TypeScript
* HTML5
* CSS3
* Material UI
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* dotenv

### Tools

* Git
* GitHub
* VS Code
* Postman
* Nodemon

---

# 📂 Project Structure

```text
Placement-Hub/
│
├── BACKEND/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── studentController.js
│   │   ├── jobController.js
│   │   └── applicationController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   ├── Interview.js
│   │   └── Placement.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── applicationRoutes.js
│   │   └── placementRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── FRONTEND/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── routes/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

> The project structure may change as development continues.

---

# 🔑 Authentication & Authorization

The backend uses **JWT-based authentication**.

After successful login, the server generates a JWT containing the user's identity and role.

Example:

```js
const token = jwt.sign(
  {
    id: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h"
  }
);
```

The client sends the token with protected requests:

```http
Authorization: Bearer <JWT_TOKEN>
```

The authentication middleware verifies the token:

```text
Request
   ↓
Authorization Header
   ↓
JWT Verification
   ↓
req.user
   ↓
Role Verification
   ↓
Protected Controller
```

---

# 🛡️ Role-Based Access Control

Placement Hub supports two roles:

```text
ADMIN
STUDENT
```

Example:

```js
roleMiddleware("admin")
```

Only Admin users can access admin-specific routes.

Example:

```js
app.get(
  "/api/admin/students",
  authMiddleware,
  roleMiddleware("admin"),
  getAllStudents
);
```

Student routes can similarly be protected:

```js
app.get(
  "/api/student/profile",
  authMiddleware,
  roleMiddleware("student"),
  getStudentProfile
);
```

---

# 🔗 API Endpoints

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

## Student

```text
GET    /api/student/profile
PUT    /api/student/profile
GET    /api/student/jobs
POST   /api/student/applications
GET    /api/student/applications
```

## Admin

```text
GET    /api/admin/students
GET    /api/admin/jobs
POST   /api/admin/jobs
PUT    /api/admin/jobs/:id
DELETE /api/admin/jobs/:id

GET    /api/admin/applications
PUT    /api/admin/applications/:id

GET    /api/admin/placements
POST   /api/admin/placements
```

> API endpoints may change as the project develops.

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone <your-repository-url>
```

```bash
cd Placement-Hub
```

---

## 2. Backend Setup

```bash
cd BACKEND
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd FRONTEND
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

---

# 🔒 Environment Variables

Do not commit your `.env` file to GitHub.

Add this to `.gitignore`:

```gitignore
node_modules/
.env
dist/
```

---

# 🧪 API Testing

The backend APIs can be tested using **Postman**.

Example login:

```http
POST /api/auth/login
Content-Type: application/json
```

Request:

```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

For protected APIs:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 📈 Future Enhancements

* Resume upload
* Automated eligibility checking
* Advanced placement analytics
* Email notifications
* Placement statistics
* PDF/Excel report generation
* Search and filtering
* Pagination
* Interview scheduling
* Student placement history
* Department-wise placement reports

---

# 🎯 Project Objective

Placement Hub aims to provide a centralized system for colleges to manage placement activities efficiently.

The system connects **Admin/TPO and Students** and manages the placement lifecycle from student registration and job applications to shortlisting, interviews, results, and final placement.

---

# 👨‍💻 Developer

**Subrata Roy**

MCA Student | MERN Stack Developer

**Technologies:** React.js • Node.js • Express.js • MongoDB • JavaScript • JWT

---

# 📌 Project Status

🚧 **Currently Under Development**

The project is being actively developed with new features, APIs, database models, authentication, and UI components being added progressively.
