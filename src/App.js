import { useContext } from "react";
import Search from "./components/Search";
import { Context } from "./state/context";
import "./App.css";

function App() {

  /* global state */
  const [state, dispatch] = useContext(Context);

  return (
    
      <div className="container">
        <header className="App-header">
          <h1>Brochain.net</h1>
        </header>
        <main className="row">
          <Search
            name="exchange"
            inputLabel="Exchange"
            availableLabel="Available exchanges"
            url="http://localhost:5000/exchanges"
          />
          <Search
            name="pair"
            inputLabel="Trading pair"
            availableLabel="Available pairs"
            url={`http://localhost:5000/exchanges/${state.exchange}/pairs`}
          />
          <Search
            name="interval"
            inputLabel="Trading interval"
            availableLabel="Available intervals"
            url={`http://localhost:5000/exchanges/${state.exchange}/intervals`}
          />
        </main>
      </div>
  );
}

export default App;
