import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./components/AuthProviderWrapper.jsx"; // small wrapper (file below)
import Header from "./components/Header.jsx";
import PlantGrid from "./components/PlantGrid.jsx";
import Filters from "./components/Filters.jsx";
import AddPlant from "./components/AddPlant.jsx";
import { fetchPlants, addPlant } from "./api.js";

// App manages auth state via AuthProviderWrapper; AddPlant will be visible only to admin
function AppInner() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({ total: 0 });

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchPlants({ q: search, cat: category });
      // API returns { items, total, page, pages } or array depending on implementation; handle both
      if (Array.isArray(data)) {
        setPlants(data);
        setMeta({ total: data.length });
      } else {
        setPlants(data.items || []);
        setMeta({ total: data.total || (data.items || []).length });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [search, category]);

  const handleAdded = async (payload) => {
    await addPlant(payload);
    load();
  };

  return (
    <div className="container">
      <Header setSearch={setSearch} />
      <Filters search={search} setSearch={setSearch} category={category} setCategory={setCategory} />
      <div style={{ margin: '8px 0' }}><strong>{meta.total}</strong> results</div>
      {loading ? <p>Loading…</p> : <PlantGrid plants={plants} />}
      <AddPlant onAdded={handleAdded} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppInner />
      </Router>
    </AuthProvider>
  );
}
