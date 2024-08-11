import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import NewTodoModal from "./NewTodoModal";
import { useState } from "react";

export function FilterBar({
  todos,
  setTodos,
  setShowAlert,
  searchField,
  setSearchField,
  setShowCompleted,
  showCompleted,
  setSearch,
}) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  // Filters tasks by completed or not completed status
  const handleShowCompleted = () => {
    setShowCompleted((previous) => {
      if (previous === "All") {
        return "Completed";
      } else if (previous === "Completed") {
        return "Not completed";
      } else {
        return "All";
      }
    });
  };
  // Sorts tasks by urgency in ascending or descending order
  const handleSortUrgent = () => {
    setSortUrgent(!sortUrgent);
    const sortedTodos = [...todos].sort((a, b) => {
      if (sortUrgent) {
        return parseInt(a.urgent) - parseInt(b.urgent);
      } else {
        return parseInt(b.urgent) - parseInt(a.urgent);
      }
    });
    setTodos(sortedTodos);
  };
  const [sortUrgent, setSortUrgent] = useState(true);
  const [sortDate, setSortDate] = useState(true);
  // Modifies the button that defines which field should be searched
  const handleSearchFieldButton = () => {
    if (searchField === "title") {
      setSearchField("description");
    } else {
      setSearchField("title");
    }
  };
  // Sorts tasks by date in ascending or descending order
  const handleSortDate = () => {
    setSortDate(!sortDate);
    const sortedTodos = [...todos].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sortDate) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    setTodos(sortedTodos);
  };
  return (
    <Filter>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modal"
      >
        <AddIcon />
      </button>
      <NewTodoModal setTodos={setTodos} setShowAlert={setShowAlert} />
      <button
        type="button"
        onClick={handleSortDate}
        className="btn btn-primary"
      >
        {sortDate ? (
          <i className="bi bi-sort-down"></i>
        ) : (
          <i className="bi bi-sort-up"></i>
        )}
        Date
      </button>
      <button
        type="button"
        onClick={handleSortUrgent}
        className="btn btn-primary"
      >
        {sortUrgent ? (
          <i className="bi bi-sort-down"></i>
        ) : (
          <i className="bi bi-sort-up"></i>
        )}
        Importance
      </button>
      <button
        type="button"
        onClick={handleShowCompleted}
        className="btn btn-primary"
      >
        Show : {showCompleted}
      </button>
      <button
        type="button"
        onClick={handleSearchFieldButton}
        className="btn btn-primary"
      >
        Search by : {searchField}
      </button>
      <input
        className="form-control"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleSearch}
      ></input>
    </Filter>
  );
}

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  input {
    max-width: 10vw;
    min-width: 170px;
  }
`;
