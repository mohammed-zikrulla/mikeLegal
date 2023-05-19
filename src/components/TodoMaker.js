import React, { useEffect } from "react";
import axios from "axios";
import "./TodoMaker.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setTodos,
  addTodo,
  deleteTodo,
  setSearchTerm,
  setFilter,
} from "../Store";
import CreateTodo from "./CreateTodo";
import DisplayTodos from "./DisplayTodos";
import SearchTodos from "./SearchTodos";

function TodoMaker() {
  const todos = useSelector((state) => state.todos);
  const searchTerm = useSelector((state) => state.searchTerm);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      dispatch(setTodos(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const addTodoItem = async (newTodo) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: newTodo.title,
          completed: false,
          description: newTodo.description,
        }
      );
      dispatch(addTodo(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodoItem = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      dispatch(deleteTodo(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") {
        return todo.completed;
      } else if (filter === "not_completed") {
        return !todo.completed;
      } else {
        return true;
      }
    })
    .filter((todo) => {
      const title = todo.title ? todo.title.toLowerCase() : "";
      const description = todo.description
        ? todo.description.toLowerCase()
        : "";
      const searchTermLower = searchTerm.toLowerCase();

      return (
        title.includes(searchTermLower) || description.includes(searchTermLower)
      );
    });

  return (
    <div>
      <h1>Todo List</h1>

      <CreateTodo addTodo={addTodoItem} />

      <SearchTodos
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        filter={filter}
        handleFilter={handleFilter}
      />

      <DisplayTodos todos={filteredTodos} deleteTodo={deleteTodoItem} />
    </div>
  );
}

export default TodoMaker;
