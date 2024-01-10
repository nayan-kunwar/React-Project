import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from './components/TodoItem'

function App() {
  // State to manage todos
  // todos is an array of objects, each object is todo
  const [todos, setTodos] = useState([]);

  // Function to add a new todo
  const addTodo = (todo) => {
    // {todo, completed: false} this will come from TodoForm when we will add todo
    // Update todos state with a new todo
    setTodos((prev) => [
      //prev have the access of previous last state | prev = todos
      { id: Date.now(), ...todo },
      ...prev,
    ]); // call back function will return [ ] in setTodos( [] )
  };

  // Function to update an existing todo
  const updateTodo = (id, todo) => {
    // Update todos state by mapping over existing todos
    setTodos(
      (prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)) // prevTodo is an individual object which is todo | prevTodo = {}
    );
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    // Update todos state by filtering out the todo with the specified id
    setTodos((prev) => prev.filter((todo) => todo.id !== id)); // id conditon is true then , (todo) will be stored in a new array
  };

  // Function to toggle the completion status of a todo
  const toggleComplete = (id) => {
    // Update todos state by mapping over existing todos
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")); // Convert string to json | "[ {}, {} ]" to [ {}, {} ]
    if (todos && todos.length > 0) {
      // todos = []  and length > 0
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); // Convert json array to string | [ {}, {} ] to "[ {}, {} ]"
  }, [todos]);

  return (
    // Provide the todos and todo-related functions to the context
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* Loop and Add TodoItem components here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
