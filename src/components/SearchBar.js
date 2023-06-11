import { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ handleSearch, searchQuery }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder={"Search by " + searchQuery}
      className="searchBar"
      value={query}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
