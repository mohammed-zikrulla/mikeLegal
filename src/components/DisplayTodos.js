import React, { useState } from "react";
import "./DisplayTodos.css"; // Import the CSS file
import {
  FaTrash,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa"; // Import icons from react-icons library

function DisplayTodos({ todos, deleteTodo }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(10); // Number of todos to display per page

  // Reverse the array of todos
  const reversedTodos = todos.slice().reverse();

  // Calculate the index of the last todo item on the current page
  const indexOfLastTodo = currentPage * todosPerPage;
  // Calculate the index of the first todo item on the current page
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  // Get the todos for the current page
  const currentTodos = reversedTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Function to handle going to the previous page
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Function to handle going to the next page
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Function to handle going to the first page
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Function to handle going to the last page
  const goToLastPage = () => {
    setCurrentPage(Math.ceil(reversedTodos.length / todosPerPage));
  };

  return (
    <div className="display-todos">
      {currentTodos.map((todo) => (
        <div key={todo.id} className="todo-item">
          {todo.completed ? (
            <h3
              style={{ textDecoration: "line-through", color: "red" }}
              className="completed"
            >
              {todo.title}
            </h3>
          ) : (
            <h3 style={{ color: "Green" }} className="notCompleted">
              {todo.title}
            </h3>
          )}
          <p className="description">{todo.completed}</p>
          <button onClick={() => deleteTodo(todo.id)} className="delete-button">
            <FaTrash />
          </button>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={goToFirstPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <FaAngleDoubleLeft />
        </button>
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={goToNextPage}
          disabled={indexOfLastTodo >= reversedTodos.length}
          className="pagination-button"
        >
          <FaAngleRight />
        </button>
        <button
          onClick={goToLastPage}
          disabled={indexOfLastTodo >= reversedTodos.length}
          className="pagination-button"
        >
          <FaAngleDoubleRight />
        </button>
      </div>
    </div>
  );
}

export default DisplayTodos;
