# College Management System (CMS)

A comprehensive web application designed to streamline college administration, academic management, and communication between Admins, Teachers, and Students. Built using the **MERN Stack** (MongoDB, Express.js, React, Node.js).

## 🚀 Features

### 👨‍💼 Admin Module
- **User Management**: Create and manage Student and Teacher accounts.
- **Academic Structure**:
    - Manage **Departments** (e.g., Computer Science, Electrical).
    - Manage **Subjects** and link them to Departments.
- **Timetable Management**: Create and view class schedules.
- **Dashboard**: High-level statistics of the institute.

### 👩‍🏫 Teacher Module
- **Attendance**: Mark and view student attendance.
- **Assignments**: Create assignments and upload study materials.
- **Submissions**: Review student assignment submissions.
- **Dashboard**: View assigned classes and upcoming schedules.

### 👨‍🎓 Student Module
- **Attendance**: View personal attendance records.
- **Assignments**: View assignments and submit work (via links).
- **Timetable**: Access the class schedule.

## 🛠️ Tech Stack

### Frontend
- **React.js**: Library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vite**: Fast build tool.
- **React Router**: For client-side navigation.

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework for API routing and middleware.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For secure user authentication.

---

## ⚙️ Installation & Setup

Follow these steps to get the project running locally.

### Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a MongoDB Atlas URI.

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd "College Management System (CMS)"
```

### Step 2: Backend Setup
1.  Navigate to the root directory (if not already there).
2.  Install backend dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add the following:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/college_cms
    JWT_SECRET=your_super_secret_key_change_this
    ```
4.  **Seed the Database** (Optional but recommended for first run):
    This creates default Admin, Teacher, and Student accounts.
    ```bash
    npm run data:import
    ```
5.  Start the Backend Server:
    ```bash
    npm run dev
    ```
    *Server should run on `http://localhost:5000`*

### Step 3: Frontend Setup
1.  Open a new terminal and navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install frontend dependencies:
    ```bash
    npm install
    ```
3.  Start the Frontend Development Server:
    ```bash
    npm run dev
    ```
    *App should run on `http://localhost:5173`*

---

## 🔑 Default Credentials

If you ran the seeder script (`npm run data:import`), use these credentials to login:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `123456` |
| **Teacher** | `teacher@example.com` | `password123` |
| **Student** | `student@example.com` | `password123` |

## 📡 API Endpoints Overview

- **Auth**: `/api/auth/login`
- **Admin**:
    - Users: `/api/admin/users`
    - Departments: `/api/admin/departments`
    - Subjects: `/api/admin/subjects`
    - Timetable: `/api/admin/timetable`
- **Attendance**: `/api/attendance`
- **Classes**: `/api/classes`
- **Assignments**: `/api/assignments`

---
*Developed with ❤️ using the MERN Stack.*
