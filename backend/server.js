const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(session({
  secret: "task-secret",
  resave: false,
  saveUninitialized: true
}));