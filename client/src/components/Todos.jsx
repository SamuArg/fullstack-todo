import { useEffect, useState } from "react";
import Todo from "./Todo";
import styled from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PropTypes from "prop-types";

// Component representing all the tasks displayed on the main page, manages filters and the pagination system
const Todos = ({
  todos,
  setTodos,
  showCompleted,
  search,
  setShowEditAlert,
  searchField,
}) => {
  const [pageNumber, setPageNumber] = useState(0);

  const todosPerPage = 12;
  const pagesVisited = pageNumber * todosPerPage;
  const pages = [];

  // Reset to the first page with each filter change
  useEffect(() => {
    setPageNumber(0);
  }, [search, showCompleted]);

  const displayTodos = todos
    .filter((todo) =>
      showCompleted === "All"
        ? true
        : showCompleted === "Completed"
        ? todo.completed
        : !todo.completed
    )
    .filter((todo) => {
      if (searchField == "title") {
        return todo.title.toLowerCase().startsWith(search.toLowerCase());
      } else {
        return todo.description.toLowerCase().startsWith(search.toLowerCase());
      }
    })
    .slice(pagesVisited, pagesVisited + todosPerPage)
    .map((todo) => {
      return (
        <div key={todo._id} className="col-md-4">
          <Todo
            todo={todo}
            setShowEditAlert={setShowEditAlert}
            setTodos={setTodos}
          />
        </div>
      );
    });

  const pageCount = Math.ceil(
    todos
      .filter((todo) =>
        showCompleted === "All"
          ? true
          : showCompleted === "Completed"
          ? todo.completed
          : !todo.completed
      )
      .filter((todo) => {
        return todo.title.toLowerCase().startsWith(search.toLowerCase());
      }).length / todosPerPage
  );

  for (let i = 0; i < pageCount; i++) {
    pages.push(i);
  }

  const changePage = (direction) => {
    setPageNumber((prevPageNumber) =>
      direction === "next"
        ? Math.min(prevPageNumber + 1, pageCount - 1)
        : Math.max(prevPageNumber - 1, 0)
    );
  };

  // Checks if the current page has any tasks left, if not, go back one page
  if (displayTodos.length === 0 && pageNumber > 0) {
    setPageNumber(pageNumber - 1);
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-start">{displayTodos}</div>
      {pageCount > 1 ? (
        <Paginate>
          <ArrowBackIosIcon
            onClick={() => changePage("previous")}
            className={pageNumber + 1 === 1 ? "" : "active"}
          />
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setPageNumber(page)}
              className={page === pageNumber ? "active" : ""}
            >
              {page + 1}
            </button>
          ))}
          <ArrowForwardIosIcon
            className={pageNumber + 1 === pageCount ? "" : "active"}
            onClick={() => changePage("next")}
          />
        </Paginate>
      ) : (
        <></>
      )}
    </div>
  );
};

Todos.propTypes = {
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
  search: PropTypes.string.isRequired,
  setShowEditAlert: PropTypes.func.isRequired,
  searchField: PropTypes.string.isRequired,
};

const Paginate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;
  padding: 0 5rem 1vh 5rem;
  margin-bottom: 0;
  gap: 5px;

  button {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }

  button:hover {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }

  button.active {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
  }

  svg.active {
    color: #0366d6;
    cursor: pointer;
  }
`;

export default Todos;
