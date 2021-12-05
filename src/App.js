import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "./state/context";
import HomePage from "./pages/HomePage";
import DefinitionsPage from "./pages/DefinitionsPage";
import "./App.css";
import Layout from "./layout/Layout";

function App() {
  /* global state */
  const [state, dispatch] = useContext(Context);

  return (
    <div className="container">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/definitions" element={<DefinitionsPage />}></Route>
        </Routes>
        <div className="row">{state.error}</div>
      </Layout>
    </div>
  );
}

export default App;
