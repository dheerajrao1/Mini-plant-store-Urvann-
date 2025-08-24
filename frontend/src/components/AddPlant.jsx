import React, { useState } from "react";
import { useAuth } from "./AuthProviderWrapper";


export default function AddPlant({ onAdded }) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [cats, setCats] = useState('');
  const [available, setAvailable] = useState(true);

  if (!user?.isAdmin) {
    return <div style={{ padding: 16 }}>Add Plant (admin only). Login as admin to add.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, price: Number(price), categories: cats.split(',').map(s=>s.trim()), available };
    await onAdded?.(payload);
    setName(''); setPrice(''); setCats(''); setAvailable(true);
  };

  return (
    <form onSubmit={handleSubmit} className="add-plant-form">
      <h3>Add Plant</h3>
      <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" required/>
      <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price" required/>
      <input value={cats} onChange={(e)=>setCats(e.target.value)} placeholder="Categories (comma separated)" required/>
      <label>
        <input type="checkbox" checked={available} onChange={(e)=>setAvailable(e.target.checked)} /> Available
      </label>
      <button type="submit">Add Plant</button>
    </form>
  );
}
