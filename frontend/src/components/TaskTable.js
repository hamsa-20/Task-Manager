import api from "../api";

export default function TaskTable({ tasks, reload }) {

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
                  onClick={()=>api.post(`/tasks/start/${t.id}`).then(reload)}>Start</button>

                <button className="pause"
                  onClick={()=>api.post(`/tasks/pause/${t.id}`).then(reload)}>Pause</button>

                <button className="resume"
                  onClick={()=>api.post(`/tasks/resume/${t.id}`).then(reload)}>Resume</button>

                <button className="stop"
                  onClick={()=>api.post(`/tasks/stop/${t.id}`).then(reload)}>Stop</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}