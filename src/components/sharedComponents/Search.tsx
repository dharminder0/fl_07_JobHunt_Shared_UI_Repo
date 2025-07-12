import React, { useState } from "react";

const SearchBar: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex items-center transition-all duration-300 ${
        isFocused ? "gap-2" : "gap-0"
      }`}
    >
      {isFocused && (
        <select
          className="border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Filter options"
        >
          <option value="all">All</option>
          <option value="articles">Articles</option>
          <option value="products">Products</option>
        </select>
      )}
      <input
        type="text"
        className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Search..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default SearchBar;
