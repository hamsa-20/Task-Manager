import { useState, useEffect } from "react";
import api from "./api";
import ProfileForm from "./components/ProfileForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setUser(null); // no user, show profile form
      return;
    }

    // fetch user from backend using userId header (api.js attaches it automatically)
    api.get("/user")
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error("Failed to load user:", err);
        // if user not found in DB, clear localStorage and show form
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        setUser(null);
      });
  }, []);

  if (user === undefined) return <div className="container"><p>Loading...</p></div>;

  if (!user) return <ProfileForm setUser={setUser} />;

  return <Dashboard user={user} />;
}

export default App;