import React from "react";
import "./SearchTodos.css"; 
import { IoMdSearch } from "react-icons/io"; 
import { useDispatch } from "react-redux";
import { setSearchTerm, setFilter } from "../Store";

function SearchTodos() {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="search-todos-container">
      <input
        type="text"
        onChange={(e) => handleSearch(e)}
        className="search-input"
        placeholder="Search by title or description"
      />
      <IoMdSearch className="search-icon" />

      <select onChange={handleFilter} className="filter-select">
        <option value="">All</option>
        <option value="completed">Completed</option>
        <option value="not_completed">Not Completed</option>
      </select>
    </div>
  );
}

export default SearchTodos;
