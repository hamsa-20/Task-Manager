require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");

const db = require("./config/db");

const app = express();


app.set("trust proxy", 1);

// middleware
app.use(express.json());

app.use(cors({
  origin: [
    "https://task-manager-q1j8.vercel.app"
  ],
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || "secret123",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,        // required for HTTPS
    sameSite: "none"     // allow cross-origin cookies
  }
}));

// ✅ ROUTES
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/user", userRoutes);
app.use("/tasks", taskRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API running");
});

// PORT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});

// ✅ AUTO CREATE TABLES
db.query(`
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100),
  designation VARCHAR(100),
  employee_id VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20)
)
`);

db.query(`
CREATE TABLE IF NOT EXISTS tasks (
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
)
`);