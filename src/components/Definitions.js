import { useEffect, useContext } from "react";
import { Context } from "../state/context";
import Definition from "./Definition";
import { API_URL } from "../constants";

const url = `${API_URL}/ohlcs/definitions`;

const Definitions = () => {
  /* global state */
  const [state, dispatch] = useContext(Context);

  const defintions = state.ohlcDefinitions;

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch({ type: "error", payload: `error fetching ${url}` });
          return [];
        }
      })
      .then((json) => {
        dispatch({ type: "init_definitions", payload: json });
      });
  }, [dispatch]);

  return (
    <div className="row mt-5">
      <h1 className="display-6">OHLC definitions:</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Exchange</th>
            <th scope="col">Pair</th>
            <th scope="col">Interval</th>
            <th scope="col">Update rate</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(defintions).map(([k, definition]) => (
            <Definition
              key={k}
              id={k}
              exchange={definition.exchange}
              pair={definition.pair}
              interval={definition.interval}
              intervalStd={definition.intervalStd}
              update_rate={definition.update_rate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Definitions;
