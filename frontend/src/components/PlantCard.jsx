import React from "react";

export default function PlantCard({ plant }) {
  return (
    <div className="plant-card">
      <div className="thumb">🌱</div>
      <h3>{plant.name}</h3>
      <p className="price">₹{Number(plant.price).toFixed(2)}</p>
      <p className="categories">
        {Array.isArray(plant.categories) ? plant.categories.join(", ") : ""}
      </p>
      <span className={`stock ${plant.availability ? "available" : "unavailable"}`}>
        {plant.availability ? "In Stock" : "Out of Stock"}
      </span>
    </div>
  );
}
