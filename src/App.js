import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "./state/context";
import HomePage from "./pages/HomePage";
import DefinitionsPage from "./pages/DefinitionsPage";
import OHLCPage from "./pages/OHLCPage";
import OptimisationsPage from "./pages/OptimisationsPage";
import "./App.css";
import Layout from "./layout/Layout";

function App() {
  /* global state */
  const context = useContext(Context);
  const state = context[0];

  return (
    <div className="container">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/definitions" element={<DefinitionsPage />}></Route>
          <Route path="/optimisations" element={<OptimisationsPage />} />
          <Route path="/ohlc/:exchange/:pair/:interval/:intervalStd" element={<OHLCPage />} />
        </Routes>
        <div className="row">{state.error}</div>
      </Layout>
    </div>
  );
}

export default App;
