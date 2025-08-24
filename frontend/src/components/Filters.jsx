import React from "react";

export default function Filters({ search, setSearch, category, setCategory }) {
  return (
    <div className="filters">
      <input
        className="search-box"
        type="text"
        placeholder="🔍 Search by name or keyword…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="category-dropdown"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Indoor">Indoor</option>
        <option value="Outdoor">Outdoor</option>
        <option value="Succulent">Succulent</option>
        <option value="Flowering">Flowering</option>
        <option value="Air Purifying">Air Purifying</option>
        <option value="Home Decor">Home Decor</option>
      </select>
    </div>
  );
}
