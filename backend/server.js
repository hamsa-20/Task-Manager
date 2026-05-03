require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/user", userRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});

// Fix users table
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    designation VARCHAR(100),
    employee_id VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20)
  )
`, (err) => {
  if (err) console.error("Users table error:", err.message);
  else console.log("Users table ready");
});

// Fix tasks table - drop and recreate with all correct columns
db.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    task_name VARCHAR(255),
    comment TEXT,
    expected_time INT,
    total_time INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending',
    start_time DATETIME,
    end_time DATETIME,
    last_started_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) console.error("Tasks table error:", err.message);
  else console.log("Tasks table ready");
});

// Add missing columns if table already exists without them
db.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`,
  (err) => { if (err) console.error("created_at col error:", err.message); else console.log("created_at ready"); }
);

db.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS last_started_at DATETIME`,
  (err) => { if (err) console.error("last_started_at col error:", err.message); else console.log("last_started_at ready"); }
);

db.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS start_time DATETIME`,
  (err) => { if (err) console.error("start_time col error:", err.message); else console.log("start_time ready"); }
);

db.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS end_time DATETIME`,
  (err) => { if (err) console.error("end_time col error:", err.message); else console.log("end_time ready"); }
);

db.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS comment TEXT`,
  (err) => { if (err) console.error("comment col error:", err.message); else console.log("comment ready"); }
);

db.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS expected_time INT`,
  (err) => { if (err) console.error("expected_time col error:", err.message); else console.log("expected_time ready"); }
);