import { createSlice, nanoid } from "@reduxjs/toolkit";

//initial state of store, what inside store, it contain object
const initialState = {
  todos: [{ id: 1, text: "Hello" }],
};

// Create the todos slice:

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // It contain property and function
    addTodo: (state, action) => { // addTodo is reducer
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id != action.payload); //If consdition true todo will be store in new array [{}, ...]
      // state.todos = [{}, {}, {}, ..]
    },

    //add updateTodo reducer too.
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
