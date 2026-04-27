# Task Management & Time Tracking Dashboard

A full-stack web application to manage tasks and track time with multi-state transitions (Start, Hold, Resume, Stop) and persistent storage.

---

##  Features

###  User Profile (Session-Based)
- Create profile on first login
- Stores:
  - Full Name
  - Designation
  - Employee ID
  - Email
  - Phone Number
- Session-based authentication (no login required after first entry)

---

###  Task Management
- Create tasks with:
  - Task Name
  - Comment
  - Expected Completion Time
- Multi-state lifecycle:
  - Start
  - Hold (Pause)
  - Resume
  - Stop (Complete)
- Only **one task can be active at a time**

---

###  Time Tracking Logic
- Accurate time tracking using timestamps
- Supports multiple pause/resume cycles
- Time persists across refresh (stored in DB)

---

###  CRUD Operations
- Add task
- Edit task (name & comment)
- Manual task entry (start time & end time)

---

###  Dashboard
Displays:
- Total Productive Time (per day)
- Total Break Time (per day)
- Expected vs Actual Time
- Task Performance (On Time / Exceeded)

---

###  Task Table
Includes:
- Task Name
- Status (Pending / In Progress / Paused / Completed)
- Total Duration
- Comments
- Expected Time
- Performance Indicator

---

##  Tech Stack

### Frontend
- React
- Axios
- Custom CSS

### Backend
- Node.js
- Express.js
- MySQL (XAMPP)

---

##  Setup Instructions

### 1️ Clone Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2️ Backend Setup

```bash
cd backend
npm install
npm start
```
```
http://localhost:5000
```

### 3️ Frontend Setup

```bash
cd frontend
npm install
npm start
```
Frontend runs on:

http://localhost:3000


### Database Setup (MySQL)

- Open phpMyAdmin
- Create database:

```bash
CREATE DATABASE task_manager;
```
```bash
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100),
  designation VARCHAR(100),
  employee_id VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20)
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  task_name VARCHAR(255),
  comment TEXT,
  expected_time INT,
  total_time INT DEFAULT 0,
  status VARCHAR(50),
  start_time DATETIME,
  end_time DATETIME,
  last_started_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Migration to Remote Database

- To connect to a remote database:

## Update backend config:
```bash

host: "REMOTE_HOST",
user: "USERNAME",
password: "PASSWORD",
database: "DB_NAME"
```