import { useState } from "react";
import api from "../api";

export default function ProfileForm({ setUser }) {
  const [form, setForm] = useState({
    full_name: "",
    designation: "",
    employee_id: "",
    email: "",
    phone: ""
  });

  const submit = async () => {
    await api.post("/user", form);

    // reload user from backend (session check)
    const res = await api.get("/user");
    setUser(res.data);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Profile</h2>

        <input
          placeholder="Full Name"
          onChange={e => setForm({ ...form, full_name: e.target.value })}
        />

        <input
          placeholder="Designation"
          onChange={e => setForm({ ...form, designation: e.target.value })}
        />

        <input
          placeholder="Employee ID"
          onChange={e => setForm({ ...form, employee_id: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone"
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        <button onClick={submit}>Save</button>
      </div>
    </div>
  );
}