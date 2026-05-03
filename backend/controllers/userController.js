const db = require("../config/db");

exports.createUser = (req, res) => {
  console.log("CREATE USER BODY:", req.body);

  const { full_name, designation, employee_id, email, phone } = req.body;

  if (!full_name || !designation || !employee_id || !email || !phone) {
    return res.status(400).json({ error: "All fields required" });
  }

  const sql = `INSERT INTO users (full_name, designation, employee_id, email, phone) VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [full_name, designation, employee_id, email, phone], (err, result) => {
    if (err) {
      console.error("DB INSERT ERROR:", err);
      return res.status(500).json({ error: "Database error: " + err.message });
    }

    console.log("INSERT RESULT:", result);
    console.log("INSERT ID:", result.insertId);

    res.json({
      success: true,
      userId: result.insertId
    });
  });
};

exports.getUser = (req, res) => {
  const userId = req.headers.userid;

  console.log("GET USER - userId from header:", userId);

  if (!userId) {
    return res.status(401).json({ message: "No userId provided" });
  }

  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, rows) => {
    if (err) {
      console.error("DB SELECT ERROR:", err);
      return res.status(500).json({ error: "Database error: " + err.message });
    }

    console.log("GET USER ROWS:", rows);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  });
};