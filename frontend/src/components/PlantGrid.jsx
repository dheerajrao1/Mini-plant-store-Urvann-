import React from "react";
import PlantCard from "./PlantCard";

export default function PlantGrid({ plants }) {
  if (!Array.isArray(plants) || plants.length === 0) {
    return <p className="info">No plants found 🌿</p>;
  }
  return (
    <div className="plant-grid">
      {plants.map((p) => (
        <PlantCard key={p._id} plant={p} />
      ))}
    </div>
  );
}
