const db = require("../config/db");

exports.createTask = (data, callback) => {
  db.query("INSERT INTO tasks SET ?", data, callback);
};

exports.getTasksByUser = (userId, callback) => {
  db.query("SELECT * FROM tasks WHERE user_id=?", [userId], callback);
};

exports.updateTask = (id, query, values = [], callback) => {

  if (id) {
    db.query(
      `UPDATE tasks SET ${query} WHERE id=?`,
      [...values, id],
      callback
    );
  } else {
    // for global updates (like pausing all running tasks)
    db.query(
      `UPDATE tasks SET ${query}`,
      values,
      callback
    );
  }
};