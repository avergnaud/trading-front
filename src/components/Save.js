import { useContext } from "react";
import { Context } from "../state/context";
import classes from "./Save.module.css";
import { API_URL } from "../constants";

const Save = () => {
  /* global state */
  const [state, dispatch] = useContext(Context);

  const isEnabled =
    state.exchange && state.pair && state.interval && state.update_rate;

  const clickHandler = () => {
    fetch(`${API_URL}/ohlc_definitions`, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exchange: state.exchange,
        pair: state.pair,
        interval: state.interval,
        update_rate: state.update_rate,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: "SAVE_DEFINITION",
          payload: json
        });
      });
  };

  return (
    <div className="row my-3">
      <button
        disabled={!isEnabled}
        className={`btn btn-primary ${classes.saveButton}`}
        onClick={clickHandler}
      >
        Save OHLC feeder
      </button>
    </div>
  );
};

export default Save;
