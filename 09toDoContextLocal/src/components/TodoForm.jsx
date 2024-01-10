import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {
  const [todo, setTodo] = useState(""); // at first there is no vlaue in form, so empty string is there, we have to add todo

  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if(!todo) return // If todo is "" , return do not add todo, as empty string is false make it true by includinf not.

    addTodo({todo, completed: false}) // Calling addTodo of App.jsx
  }

  return (
    <form onSubmit= {add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo} // value will be "" at first thats why we see nothing in input when we are adding todo
        onChange={(e) => setTodo(e.target.value)} // when we adding todo the value should go to todo
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
