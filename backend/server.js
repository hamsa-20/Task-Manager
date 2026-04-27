require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");

const db = require("./config/db");

const app = express();


app.use(express.json());

app.use(cors({
  origin: "*", // for now (later restrict to frontend URL)
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || "secret123",
  resave: false,
  saveUninitialized: true
}));

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


const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});