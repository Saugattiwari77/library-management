import React, { useState } from "react";
const OrderSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    onSearch(query);
    setQuery("");
  };
  return (
    <div className="order-search" style={{ marginBottom: 24 }}>
      <label htmlFor="order-search-input" style={{ marginRight: 8, fontWeight: 500 }}>Search Order:</label>
      <input
        id="order-search-input"
        type="text"
        placeholder="Enter Claim Code or Member ID"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
        style={{ padding: 8, width: 250, marginRight: 8 }}
      />
      <button onClick={handleSearch} style={{ padding: "8px 16px" }}>Search</button>
    </div>
  );
};
export default OrderSearch; 