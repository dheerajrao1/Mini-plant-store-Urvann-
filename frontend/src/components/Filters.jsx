import React from "react";

export default function Filters({ search, setSearch, category, setCategory }) {
  const categories = ['All','Indoor','Outdoor','Succulent','Flowering','Herb','Home Decor'];

  return (
    <div className="filters">
      <input
        className="search-box"
        placeholder="Search plants by name or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select className="category-dropdown" value={category} onChange={(e)=>setCategory(e.target.value)}>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}
