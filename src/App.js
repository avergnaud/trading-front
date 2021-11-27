import { useContext } from "react";
import { Context } from "./state/context";
import Search from "./components/Search";
import Definitions from "./components/Definitions";
import "./App.css";

function App() {
  /* global state */
  const [state, dispatch] = useContext(Context);

  return (
    <div className="container">
      <header className="App-header">
        <h1>Brochain.net</h1>
      </header>
      <main>
        <Search />
        <Definitions />
      </main>
      <div className="row">{state.error}</div>
    </div>
  );
}

export default App;
