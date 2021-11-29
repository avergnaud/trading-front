import { useContext } from "react";
import { Context } from "../state/context";
import classes from "./Save.module.css";

const Save = () => {
  /* global state */
  const [state, dispatch] = useContext(Context);

  const isEnabled =
    state.exchange && state.pair && state.interval && state.isValidCron;

  const clickHandler = () => {
    fetch("http://localhost:5000/ohlc_definitions", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exchange: state.exchange,
        pair: state.pair,
        interval: state.interval,
        update_cron: state.cron,
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
    <div className="row my-1">
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
