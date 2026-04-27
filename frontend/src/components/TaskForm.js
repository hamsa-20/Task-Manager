import { useState } from "react";
import api from "../api";

export default function TaskForm({ reload }) {
  const [task, setTask] = useState({});

  const submit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return alert("User not found");

      await api.post("/tasks", {
        ...task,
        user_id: user.id 
      });

      setTask({});
      reload();
    } catch (err) {
      console.error("Task create error:", err);
    }
  };

  return (
    <div className="card">
      <h3>Add Task</h3>

      <input
        placeholder="Task Name"
        onChange={e => setTask({ ...task, task_name: e.target.value })}
      />

      <textarea
        placeholder="Comment"
        onChange={e => setTask({ ...task, comment: e.target.value })}
      />

      <input
        placeholder="Expected Time (seconds)"
        onChange={e => setTask({ ...task, expected_time: e.target.value })}
      />

      <button onClick={submit}>Add Task</button>
    </div>
  );
}