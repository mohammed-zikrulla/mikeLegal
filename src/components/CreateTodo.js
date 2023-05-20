import React, { useState } from "react";
import "./CreateTodo.css"; 

function CreateTodo({ addTodo }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      return;
    }
    addTodo({
      title,
    });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="create-todo-form">
      <h2 className="create-todo-heading">Add New Todo</h2>
      <div className="input-group">
        <input
          type="text"
          id="title"
          placeholder="ex: eat, sleep, work...."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          required
        />
      </div>

      <button type="submit" className="add-todo-button">
        Add Todo
      </button>
    </form>
  );
}

export default CreateTodo;
