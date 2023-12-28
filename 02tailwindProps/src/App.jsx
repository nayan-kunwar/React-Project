import Card from "./components/card";

function App() {
  let obj = {
    name: "Nayan",
    age: 24,
  };

  let arr = [1, 2, 3];

  return (
    <>
      <h1 className="bg-green-500 mb-3">Aman Kunwar</h1>
      <Card myObj={obj} myArr={arr} />
      <Card username="Aman Kunwar" btnText="Click Me!" />
      <Card username="Virat Kholi" btnText="Click Me too!" />
    </>
  );
}

export default App;
