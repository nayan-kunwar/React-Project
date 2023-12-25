import { useState } from "react";
import "./App.css";
// React Counter Project
function App() {
  const [counter, setCounter] = useState(1);
  const addValue = () => {
    if(counter >= 1 && counter <= 9 ){
      setCounter(counter + 1);
    }
   
  };
  const removeValue = () => {
    if(counter >= 1 && counter <= 10 ){
      setCounter(counter - 1);
    }
  };
  return (
    <>
      <h1>React Counter Project</h1>
      <button onClick={addValue}>Add Count: {counter}</button>
      <br />
      <br />
      <button onClick={removeValue}>Remove Count: {counter}</button>
    </>
  );
}

export default App;
