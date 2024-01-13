import { useState } from 'react'
import AddTodo from './components/AddTodo'
import TodoItem from './components/TodoItem'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <AddTodo />
     <TodoItem />
    </>
  )
}

export default App
