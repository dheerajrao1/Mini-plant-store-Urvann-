import React from "react";

const PlantCard = ({ plant }) => {
  return (
    <div className="plant-card">
      <h3>{plant.name}</h3>
      <p>
        <strong>Price:</strong> ₹{plant.price}
      </p>
      <p>
        <strong>Categories:</strong> {plant.categories.join(", ")}
      </p>
      <p>
        <strong>Stock:</strong> {plant.stock ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default PlantCard;
