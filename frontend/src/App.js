import { useState, useEffect } from "react";
import api from "./api";
import ProfileForm from "./components/ProfileForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setUser(null);
      return;
    }

    api.get("/user")
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error("Failed to load user:", err);
        // Only clear if user genuinely not found
        if (err.response?.status === 404) {
          localStorage.removeItem("userId");
          localStorage.removeItem("user");
        }
        setUser(null);
      });
  }, []);

  if (user === undefined) return (
    <div className="container">
      <p>Loading...</p>
    </div>
  );

  if (!user) return <ProfileForm setUser={setUser} />;

  return <Dashboard user={user} />;
}

export default App;