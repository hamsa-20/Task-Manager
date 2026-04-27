import { useEffect, useState } from "react";
import api from "./api";
import ProfileForm from "./components/ProfileForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    api.get("/user")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (user === undefined) return <div>Loading...</div>;

  if (!user) return <ProfileForm setUser={setUser} />;

  return <Dashboard />;
}

export default App;