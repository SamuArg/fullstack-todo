import { useState } from "react";
import Todo from "./Todo";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Todos = ({ todos, setTodos, showCompleted, search }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const todosPerPage = 12;
  const pagesVisited = pageNumber * todosPerPage;

  const displayTodos = todos
    .filter((todo) =>
      showCompleted === "Toutes"
        ? true
        : showCompleted === "Complétées"
        ? todo.completed
        : !todo.completed
    )
    .filter((todo) => {
      return todo.title.toLowerCase().startsWith(search.toLowerCase());
    })
    .slice(pagesVisited, pagesVisited + todosPerPage)
    .map((todo) => {
      return (
        <div key={todo._id} className="col-md-4">
          <Todo todo={todo} setTodos={setTodos} />
        </div>
      );
    });

  const pageCount = Math.ceil(
    todos
      .filter((todo) =>
        showCompleted === "Toutes"
          ? true
          : showCompleted === "Complétées"
          ? todo.completed
          : !todo.completed
      )
      .filter((todo) => {
        return todo.title.toLowerCase().startsWith(search.toLowerCase());
      }).length / todosPerPage
  );

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-start">{displayTodos}</div>
      {pageCount > 1 ? (
        <MyPaginate
          previousLabel={<ArrowBackIosIcon />}
          nextLabel={<ArrowForwardIosIcon />}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination"}
          previousLinkClassName={"previous"}
          nextLinkClassName={"next"}
          disabledClassName={"disabled"}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: "active",
})`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;
  padding: 0 5rem 1vh 5rem;
  margin-bottom: 0;
  gap: 5px;

  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

export default Todos;
