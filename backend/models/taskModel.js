const db = require("../config/db");

exports.createTask = (data, callback) => {
  const { user_id, task_name, comment, expected_time, status, total_time, start_time, end_time } = data;

  const sql = `INSERT INTO tasks (user_id, task_name, comment, expected_time, status, total_time, start_time, end_time) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    user_id,
    task_name,
    comment || null,
    expected_time || null,
    status || "pending",
    total_time || 0,
    start_time || null,
    end_time || null
  ], callback);
};

exports.getTasksByUser = (userId, callback) => {
  db.query(
    "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
    callback
  );
};

exports.updateTask = (id, fields, values, callback) => {
  // handle case where values is omitted: updateTask(id, fields, callback)
  if (typeof values === "function") {
    callback = values;
    values = [];
  }

  if (id) {
    db.query(
      `UPDATE tasks SET ${fields} WHERE id = ?`,
      [...values, id],
      callback
    );
  } else {
    // global update (e.g. pause all running tasks)
    db.query(
      `UPDATE tasks SET ${fields}`,
      values,
      callback
    );
  }
};