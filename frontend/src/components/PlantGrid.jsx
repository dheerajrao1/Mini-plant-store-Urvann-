import React from "react";
import PlantCard from "./PlantCard.jsx";

export default function PlantGrid({ plants = [] }) {
  if (!plants || plants.length === 0) {
    return <p style={{ padding: 16 }}>No plants found</p>;
  }

  return (
    <div className="plant-grid">
      {plants.map(p => <PlantCard key={p._id || p.id} plant={p} />)}
    </div>
  );
}
