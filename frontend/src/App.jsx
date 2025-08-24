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
  const [showAddPlant, setShowAddPlant] = useState(false); // toggle AddPlant form

  // Auth helpers
  const handleLogin = async (username, password) => {
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
    try {
      const res = await registerUser(username, password);
      if (res && (res.message || res.success)) return { ok: true };
      return { ok: false, message: res?.message || "Register failed" };
    } catch (e) {
      return { ok: false, message: e.message || "Register failed" };
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowAddPlant(false); // hide AddPlant form on logout
  };

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
  }, [search, category]);

  return (
    <div className="container">
      <Header
        user={user}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
        toggleAddPlant={() => setShowAddPlant((prev) => !prev)}
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

        {/* AddPlant form shown above the grid */}
        {user?.role === "admin" && showAddPlant && (
          <>
            <h2 className="section-title">Add New Plant</h2>
            <AddPlant token={user.token} onAdded={loadPlants} />
          </>
        )}

        <PlantGrid plants={plants} />
      </div>
    </div>
  );
}
