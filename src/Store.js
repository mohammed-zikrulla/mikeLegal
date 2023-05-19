import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  searchTerm: "",
  filter: "",
};

const mySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setTodos, addTodo, deleteTodo, setSearchTerm, setFilter } =
  mySlice.actions;

const store = configureStore({
  reducer: mySlice.reducer,
});

export default store;
