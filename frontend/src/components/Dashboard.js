import { useEffect, useState } from "react";
import api from "../api";
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => { load(); }, []);

  // Metrics
  const totalTime = tasks.reduce((sum, t) => sum + t.total_time, 0);

  const productiveTime = tasks
    .filter(t => t.status === "completed")
    .reduce((sum, t) => sum + t.total_time, 0);

  const breakTime = totalTime - productiveTime;

  return (
    <div className="container">
      <h2>Task Dashboard</h2>

      {/*  METRICS */}
      <div className="card metrics">
        <div className="metric-box">
          <h4>Total Time</h4>
          <p>{totalTime}s</p>
        </div>

        <div className="metric-box">
          <h4>Productive Time</h4>
          <p>{productiveTime}s</p>
        </div>

        <div className="metric-box">
          <h4>Break Time</h4>
          <p>{breakTime}s</p>
        </div>
      </div>

      <TaskForm reload={load} />
      <TaskTable tasks={tasks} reload={load} />
    </div>
  );
}