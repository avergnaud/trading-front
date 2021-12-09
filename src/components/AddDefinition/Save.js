import { useContext } from "react";
import { Context } from "../../state/context";
import classes from "./Save.module.css";
import { API_URL } from "../../constants";

const Save = (props) => {
  /* global state */
  const [state, dispatch] = useContext(Context);

  const isEnabled =
    state.exchange && state.pair && state.interval && state.update_rate;

  const clickHandler = () => {
    console.log("state! ", state)
    fetch(`${API_URL}/ohlcs/definitions`, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exchange: state.exchange,
        pair: state.pair,
        interval: state.interval,
        interval_std: state.intervalStd,
        update_rate: state.update_rate,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: "SAVE_DEFINITION",
          payload: json,
        });
      });
  };

  return (
    <div className="row my-3">
      <div className="col">
        <div className="card text-center">
          <div className={`card-body`}>
            <h5 className={`card-title ${classes.saveTitle}`}>
              Save
              <span className="badge bg-secondary mx-1">{state.exchange}</span>
              <span className="badge bg-secondary mx-1">{state.pair}</span>
              <span className="badge bg-secondary mx-1">{state.interval}</span>
              OHLC feeder
            </h5>
            <button
              disabled={!isEnabled}
              className={`btn btn-outline-success btn-lg ${classes.saveButton}`}
              onClick={clickHandler}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="col d-flex align-items-center">
        <div className={classes.close}>
          <button
            className={`btn btn-outline-secondary btn-lg`}
            onClick={props.closeFormHandler}
          >
            Close this form
          </button>
        </div>
      </div>
    </div>
  );
};

export default Save;
