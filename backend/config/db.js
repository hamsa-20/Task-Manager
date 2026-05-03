const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3307
});

db.connect(err => {
  if (err) {
    console.error("DB Connection Error:", err.message);
    process.exit(1); // crash loudly so you see the real error on Render logs
  } else {
    console.log("DB Connected successfully");
  }
});

module.exports = db;