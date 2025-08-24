import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import PlantGrid from "./components/PlantGrid";
import Filters from "./components/Filters";
import AddPlant from "./components/AddPlant";
import { fetchPlants, loginUser, registerUser } from "./api";

export default function App() {
  const [user, setUser] = useState(null); // { username, role, token }
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auth helpers (no localStorage; token stays in memory)
  const handleLogin = async (username, password) => {
    setError("");
    try {
      const res = await loginUser(username, password);
      if (res.token) {
        setUser({ username, role: res.role, token: res.token });
        return { ok: true, role: res.role };
      }
      return { ok: false, message: res.message || "Login failed" };
    } catch (e) {
      return { ok: false, message: e.message || "Login failed" };
    }
  };

  const handleRegister = async (username, password) => {
    setError("");
    try {
      const res = await registerUser(username, password);
      if (res && (res.message || res.success)) {
        return { ok: true };
      }
      return { ok: false, message: res?.message || "Register failed" };
    } catch (e) {
      return { ok: false, message: e.message || "Register failed" };
    }
  };

  const handleLogout = () => setUser(null);

  const loadPlants = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPlants({ q: search, cat: category });
      setPlants(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load plants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  return (
    <div className="container">
      <Header
        user={user}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
      />

      <div className="content">
        <Filters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
        />

        {loading && <p className="info">Loading plants…</p>}
        {error && <p className="error">{error}</p>}

        <PlantGrid plants={plants} />

        {user?.role === "admin" && (
          <>
            <h2 className="section-title">Add New Plant</h2>
            <AddPlant token={user.token} onAdded={loadPlants} />
          </>
        )}
      </div>
    </div>
  );
}
