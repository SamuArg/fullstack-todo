import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import NewTodoModal from "./NewTodoModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "./LogoutModal";
import PropTypes from "prop-types";

// Component representing the header bar displayed at the top of the task list, containing all the filter buttons, search functionality, and the add task button
const Header = ({
  todos,
  setTodos,
  showCompleted,
  setShowCompleted,
  setSearch,
  showEditAlert,
  setShowEditAlert,
  searchField,
  setSearchField,
}) => {
  const navigate = useNavigate();
  const [sortDate, setSortDate] = useState(true);
  const [sortUrgent, setSortUrgent] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  // Modifies the button that defines which field should be searched
  const handleSearchFieldButton = () => {
    if (searchField === "title") {
      setSearchField("description");
    } else {
      setSearchField("title");
    }
  };

  return (
    <Container className="px-3 mb-3">
      <h1>TO DO</h1>
      {showAlert ? (
        <Alert className="alert alert-success alert-dismissible" role="alert">
          <div>Your task has been successfully created</div>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => {
              setShowAlert(false);
            }}
          ></button>
        </Alert>
      ) : (
        ""
      )}
      {showEditAlert ? (
        <EditAlert
          className="alert alert-success alert-dismissible"
          role="alert"
        >
          <div>Your task has been successfully modified</div>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => {
              setShowEditAlert(false);
            }}
          ></button>
        </EditAlert>
      ) : (
        ""
      )}
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
          )}{" "}
          Date
        </button>
        <button
          type="button"
          onClick={handleSortUrgent}
          className="btn btn-primary"
        >
          {" "}
          {sortUrgent ? (
            <i className="bi bi-sort-down"></i>
          ) : (
            <i className="bi bi-sort-up"></i>
          )}{" "}
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

      <LogoutIcon data-bs-toggle="modal" data-bs-target="#logout" />
      <LogoutModal handleLogout={handleLogout} />
    </Container>
  );
};

Header.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      urgent: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
  showCompleted: PropTypes.string.isRequired,
  setShowCompleted: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  showEditAlert: PropTypes.bool.isRequired,
  setShowEditAlert: PropTypes.func.isRequired,
  searchField: PropTypes.string.isRequired,
  setSearchField: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  & svg {
    cursor: pointer;
  }
`;

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

// Positions the alert in the middle at the top of the screen
const Alert = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  z-index: 1050;
`;
// Positions the alert in the middle at the top of the screen
const EditAlert = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  z-index: 1050;
`;

export default Header;
