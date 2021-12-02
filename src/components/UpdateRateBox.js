import { useContext } from "react";
import { Context } from "../state/context";
import classes from "./UpdateRateBox.module.css";

const CronBox = () => {

  /* global state */
  const [state, dispatch] = useContext(Context);

  const cronChangeHandler = (event) => {
    dispatch({ type: "field", fieldName: "update_rate", payload: event.target.value });
  };

  return (
    <>
      <p className="lead">
        <label htmlFor="update_rate" className="control-label">
          update rate (minutes)
        </label>
      </p>
      <div>
        <input
          type="number"
          min="5"
          id="update_rate"
          value={state.update_rate}
          onChange={cronChangeHandler}
          onBlur={cronChangeHandler}
          className="form-control"
        />
      </div>
      <div
        className={`rounded p-3 mb-1 bg-success text-white fs-5 ${classes.result}`}
      >
        {state.update_rate}
      </div>
    </>
  );
};

export default CronBox;
