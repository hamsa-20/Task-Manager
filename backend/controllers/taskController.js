const db = require("../config/db");

exports.createTask = (req, res) => {
  const userId = req.headers.userid;
  const { task_name, comment, expected_time } = req.body;

  if (!task_name) {
    return res.status(400).json({ error: "Task name required" });
  }

  const sql = `INSERT INTO tasks (user_id, task_name, comment, expected_time, status, total_time) 
               VALUES (?, ?, ?, ?, 'pending', 0)`;

  db.query(sql, [userId, task_name, comment || null, expected_time || null], (err, result) => {
    if (err) {
      console.error("CREATE TASK ERROR:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, taskId: result.insertId });
  });
};

exports.getTasks = (req, res) => {
  const userId = req.headers.userid;

  if (!userId) return res.status(401).json({ message: "No user" });

  db.query(
    "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
    (err, result) => {
      if (err) {
        console.error("GET TASKS ERROR:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    }
  );
};

exports.startTask = (req, res) => {
  const userId = req.headers.userid;

  // First pause any currently running task for this user
  const pauseSql = `
    UPDATE tasks 
    SET status='paused', 
        total_time = total_time + TIMESTAMPDIFF(SECOND, last_started_at, NOW())
    WHERE status='in_progress' AND user_id = ?
  `;

  db.query(pauseSql, [userId], (err) => {
    if (err) {
      console.error("PAUSE EXISTING ERROR:", err.message);
      return res.status(500).json({ error: err.message });
    }

    const startSql = `
      UPDATE tasks 
      SET status='in_progress', 
          last_started_at=NOW(), 
          start_time=IFNULL(start_time, NOW())
      WHERE id = ? AND user_id = ?
    `;

    db.query(startSql, [req.params.id, userId], (err) => {
      if (err) {
        console.error("START TASK ERROR:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true });
    });
  });
};

exports.pauseTask = (req, res) => {
  const userId = req.headers.userid;

  const sql = `
    UPDATE tasks 
    SET status='paused', 
        total_time = total_time + TIMESTAMPDIFF(SECOND, last_started_at, NOW())
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [req.params.id, userId], (err) => {
    if (err) {
      console.error("PAUSE TASK ERROR:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
};

exports.resumeTask = (req, res) => {
  const userId = req.headers.userid;

  const sql = `
    UPDATE tasks 
    SET status='in_progress', 
        last_started_at=NOW()
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [req.params.id, userId], (err) => {
    if (err) {
      console.error("RESUME TASK ERROR:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
};

exports.stopTask = (req, res) => {
  const userId = req.headers.userid;

  const sql = `
    UPDATE tasks 
    SET status='completed', 
        total_time = total_time + TIMESTAMPDIFF(SECOND, last_started_at, NOW()),
        end_time=NOW()
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [req.params.id, userId], (err) => {
    if (err) {
      console.error("STOP TASK ERROR:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
};

exports.editTask = (req, res) => {
  const userId = req.headers.userid;
  const { task_name, comment } = req.body;

  const sql = `UPDATE tasks SET task_name=?, comment=? WHERE id=? AND user_id=?`;

  db.query(sql, [task_name, comment, req.params.id, userId], (err) => {
    if (err) {
      console.error("EDIT TASK ERROR:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
};

exports.manualTask = (req, res) => {
  const userId = req.headers.userid;
  const { task_name, start_time, end_time } = req.body;

  const total = Math.floor(
    (new Date(end_time) - new Date(start_time)) / 1000
  );

  const sql = `INSERT INTO tasks (user_id, task_name, start_time, end_time, total_time, status) 
               VALUES (?, ?, ?, ?, ?, 'completed')`;

  db.query(sql, [userId, task_name, start_time, end_time, total], (err, result) => {
    if (err) {
      console.error("MANUAL TASK ERROR:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, taskId: result.insertId });
  });
};