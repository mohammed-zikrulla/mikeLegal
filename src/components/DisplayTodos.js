import React, { useState } from "react";
import "./DisplayTodos.css"; 
import {
  FaTrash,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa"; 

function DisplayTodos({ todos, deleteTodo }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(10); 

  
  const reversedTodos = todos.slice().reverse();


  const indexOfLastTodo = currentPage * todosPerPage;

  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  const currentTodos = reversedTodos.slice(indexOfFirstTodo, indexOfLastTodo);


  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };


  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };


  const goToFirstPage = () => {
    setCurrentPage(1);
  };


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
