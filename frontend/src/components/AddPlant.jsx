import React, { useState } from "react";
import { addPlant } from "../api";

export default function AddPlant({ token, onAdded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState(""); // comma-separated
  const [availability, setAvailability] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      const payload = {
        name,
        price: Number(price),
        categories: categories.split(",").map((s) => s.trim()).filter(Boolean),
        availability,
      };
      await addPlant(payload, token);
      setMsg("✅ Plant added");
      setName("");
      setPrice("");
      setCategories("");
      setAvailability(true);
      onAdded && onAdded();
    } catch (err) {
      setMsg(`❌ ${err.message || "Failed to add plant"}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="add-plant-form" onSubmit={submit}>
      <h2>Add Plant (Admin)</h2>
      <input
        placeholder="Plant name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Price (₹)"
        type="number"
        min="0"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        placeholder="Categories (comma separated)"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
      />
      <select
        value={availability ? "yes" : "no"}
        onChange={(e) => setAvailability(e.target.value === "yes")}
      >
        <option value="yes">Available</option>
        <option value="no">Unavailable</option>
      </select>

      {msg && <p className="info">{msg}</p>}
      <button type="submit" disabled={busy}>{busy ? "Saving…" : "Add Plant"}</button>
    </form>
  );
}
