const taskModel = require("../models/taskModel");

exports.createTask = (req, res) => {
  const data = {
    user_id: req.session.userId,
    task_name: req.body.task_name,
    comment: req.body.comment,
    expected_time: req.body.expected_time,
    status: "pending"
  };

  taskModel.createTask(data, () => res.send({ success: true }));
};

exports.getTasks = (req, res) => {
  const userId = req.query.userId; // 

  if (!userId) return res.status(401).send("No user");

  taskModel.getTasksByUser(userId, (err, result) => {
    res.send(result);
  });
};



//  START TASK (FIXED: only one task running)
exports.startTask = (req, res) => {

  // Pause any running task first
  taskModel.updateTask(
    null,
    "status='paused', total_time = total_time + TIMESTAMPDIFF(SECOND, last_started_at, NOW()) WHERE status='in_progress'",
    () => {

      // Start selected task
      taskModel.updateTask(
        req.params.id,
        "status='in_progress', last_started_at=NOW(), start_time=IFNULL(start_time, NOW())",
        () => res.send({ success: true })
      );

    }
  );
};



exports.pauseTask = (req, res) => {
  taskModel.updateTask(
    req.params.id,
    "status='paused', total_time = total_time + TIMESTAMPDIFF(SECOND, last_started_at, NOW())",
    () => res.send({ success: true })
  );
};

exports.resumeTask = (req, res) => {
  taskModel.updateTask(
    req.params.id,
    "status='in_progress', last_started_at=NOW()",
    () => res.send({ success: true })
  );
};

exports.stopTask = (req, res) => {
  taskModel.updateTask(
    req.params.id,
    "status='completed', total_time = total_time + TIMESTAMPDIFF(SECOND, last_started_at, NOW()), end_time=NOW()",
    () => res.send({ success: true })
  );
};



/*  EDIT TASK (for comments requirement) */
exports.editTask = (req, res) => {
  const { task_name, comment } = req.body;

  taskModel.updateTask(
    req.params.id,
    "task_name=?, comment=?",
    (err) => res.send({ success: true })
  );
};



/*  MANUAL ENTRY  */
exports.manualTask = (req, res) => {
  const { task_name, start_time, end_time } = req.body;

  const total = Math.floor(
    (new Date(end_time) - new Date(start_time)) / 1000
  );

  const data = {
    user_id: req.session.userId,
    task_name,
    start_time,
    end_time,
    total_time: total,
    status: "completed"
  };

  taskModel.createTask(data, () => res.send({ success: true }));
};