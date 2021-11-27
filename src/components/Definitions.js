import { useEffect, useContext } from "react";
import { Context } from "../state/context";

const url = "http://localhost:5000/ohlc_definitions";

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
    <div className="row">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Exchange</th>
            <th scope="col">Pair</th>
            <th scope="col">Interval</th>
            <th scope="col">Update cron</th>
          </tr>
        </thead>
        <tbody>
          {defintions.map((definition) => (
            <tr key={definition._id}>
              <td>{definition.exchange}</td>
              <td>{definition.pair}</td>
              <td>{definition.interval}</td>
              <td>{definition.update_cron}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Definitions;
