import { useContext, useEffect, useState } from "react";
import { Context } from "../state/context";
import classes from "./CronBox.module.css";
import cronstrue from 'cronstrue';

const CronBox = () => {

  /* global state */
  const [state, dispatch] = useContext(Context);

  const [cronComment, setCronComment] = useState("");

  useEffect(() => {

    try {
      setCronComment(cronstrue.toString(state.cron));
      dispatch({ type: 'field', fieldName: 'isValidCron', payload: true});
    } catch (error) {
      setCronComment(error);
      dispatch({ type: 'field', fieldName: 'isValidCron', payload: false});
    }

  }, [state.cron, cronComment])

  const cronChangeHandler = (event) => {
    dispatch({ type: "field", fieldName: "cron", payload: event.target.value });
  };


  return (
    <>
      <p className="lead">
        <label htmlFor="cron" className="control-label">
          cron
        </label>
      </p>
      <div>
        <input
          type="text"
          id="cron"
          value={state.cron}
          onChange={cronChangeHandler}
          onBlur={cronChangeHandler}
          className="form-control"
        />
      </div>
      <div>
        <a href="https://crontab.guru/" target="_blank" rel="noreferrer">
          crontab.guru
        </a>
      </div>
      <div className={classes.comment}>
        {cronComment}
      </div>
      <div
        className={`rounded p-3 mb-2 bg-success text-white fs-5 ${classes.result}`}
      >
        {state.cron}
      </div>
    </>
  );
};

export default CronBox;
