import { useEffect, useState } from "react";
import api from "../api";
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
      setError("Failed to load tasks. Please refresh.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Metrics
  const totalTime = tasks.reduce((sum, t) => sum + (t.total_time || 0), 0);

  const productiveTime = tasks
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + (t.total_time || 0), 0);

  const breakTime = totalTime - productiveTime;

  const formatTime = (seconds) => {
    if (!seconds || seconds === 0) return "0s";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h && `${h}h`, m && `${m}m`, s && `${s}s`].filter(Boolean).join(" ");
  };

  return (
    <div className="container">
      <h2>Task Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* METRICS */}
      <div className="card metrics">
        <div className="metric-box">
          <h4>Total Time</h4>
          <p>{formatTime(totalTime)}</p>
        </div>

        <div className="metric-box">
          <h4>Productive Time</h4>
          <p>{formatTime(productiveTime)}</p>
        </div>

        <div className="metric-box">
          <h4>Break Time</h4>
          <p>{formatTime(breakTime)}</p>
        </div>
      </div>

      <TaskForm reload={load} />
      <TaskTable tasks={tasks} reload={load} />
    </div>
  );
}