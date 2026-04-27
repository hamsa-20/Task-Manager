import api from "../api";

export default function TaskTable({ tasks, reload }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const call = async (url) => {
    try {
      if (!user) return;

      await api.post(`${url}?userId=${user.id}`); 
      reload();
    } catch (err) {
      console.error("Task action error:", err);
    }
  };

  return (
    <div className="card">
      <h3>Tasks</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Time</th>
            <th>Expected</th>
            <th>Performance</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map(t => (
            <tr key={t.id}>
              <td>{t.task_name}</td>
              <td>{t.status}</td>
              <td>{t.total_time}s</td>
              <td>{t.expected_time || "-"}s</td>

              <td>
                {t.expected_time && t.total_time > t.expected_time
                  ? "⚠ Exceeded"
                  : "✅ On Time"}
              </td>

              <td>{t.comment || "-"}</td>

              <td>
                <button className="start"
                  onClick={() => call(`/tasks/start/${t.id}`)}>Start</button>

                <button className="pause"
                  onClick={() => call(`/tasks/pause/${t.id}`)}>Pause</button>

                <button className="resume"
                  onClick={() => call(`/tasks/resume/${t.id}`)}>Resume</button>

                <button className="stop"
                  onClick={() => call(`/tasks/stop/${t.id}`)}>Stop</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}