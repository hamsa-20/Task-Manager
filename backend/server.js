const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

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