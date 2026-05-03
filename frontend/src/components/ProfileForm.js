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
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const { full_name, designation, employee_id, email, phone } = form;

    if (!full_name || !designation || !employee_id || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/user", form);

      console.log("RESPONSE:", res.data);

      if (!res.data.userId) {
        alert("User creation failed");
        setLoading(false);
        return;
      }

      const userData = {
        id: res.data.userId,
        ...form
      };

      // save BOTH userId and full user object to localStorage
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);

    } catch (err) {
      console.error("Profile create error:", err);
      alert("Something went wrong: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Profile</h2>

        <input
          placeholder="Full Name"
          value={form.full_name}
          onChange={e => setForm({ ...form, full_name: e.target.value })}
        />

        <input
          placeholder="Designation"
          value={form.designation}
          onChange={e => setForm({ ...form, designation: e.target.value })}
        />

        <input
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={e => setForm({ ...form, employee_id: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        <button onClick={submit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}