import classes from "./SearchBox.module.css";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../state/context";
import Loader from "../../UI/Loader";

const IntervalSearchBox = (props) => {
  const url = props.url;

  /* global state */
  const [state, dispatch] = useContext(Context);

  /* local state */
  const [inputValue, setInputValue] = useState("");
  const [availableValues, setAvailableValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        if (res.ok) {
          dispatch({ type: "success" });
          return res.json();
        } else {
          dispatch({ type: "error", payload: `error fetching ${url}` });
          return [];
        }
      })
      .then((json) => {
        setIsLoading(false);
        setAvailableValues(json);
      });
  }, [url, dispatch]);

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const selectOnChangeHandler = (e) => {
    //setInputValue(e.target.value);
    //console.log(e.target.selectedOptions)
    const element = selectValues[e.target.value];
    if(element) {
      dispatch({
        type: "SELECT_INTERVAL",
        payload: { index: e.target.value, interval: element["interval"] },
      });
    }
  };

  const selectValues = availableValues.filter((element) => {
    let elementName = element["interval"] && element["interval"].toString();
    return element["interval"] && elementName.includes(inputValue);
  });

  const selectElements = selectValues.map((element, index) => {
    if (element["allowed"] === false) {
      return (
        <option key={element._id} value="" disabled>
          {element["interval"]}{" "}
          {element["interval_std"] && `[${element["interval_std"]}]`}
        </option>
      );
    } else {
      return (
        <option key={element._id} value={index} data-std={element["interval_std"]}>
          {element["interval"]}{" "}
          {element["interval_std"] && `[${element["interval_std"]}]`}
        </option>
      );
    }
  });

  return (
    <>
      {isLoading && (
        <div className={`row ${classes.loaderContainer}`}>
          <div className={`col my-auto ${classes.loader}`}>
            <Loader />
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <p className="lead">
            <label htmlFor={"interval"} className="control-label">
              Interval
            </label>
          </p>
          <div className="row my-1">
            <div className="col-10">
              <input
                type="text"
                id={"interval"}
                value={inputValue}
                onChange={inputHandler}
                onBlur={inputHandler}
                className="form-control"
              />
            </div>
            <div className="col-2">
              <button
                type="button"
                className={"btn-close " + classes.clear}
                aria-label="Close"
                onClick={(e) => setInputValue("")}
              ></button>
            </div>
          </div>
          <div>
            <select
              id="list"
              size="10"
              value={state["intervalIndex"]}
              onChange={selectOnChangeHandler}
              onClick={selectOnChangeHandler}
              className={`form-select ${classes.selectBox}`}
            >
              {selectElements}
            </select>
          </div>
          <div
            className={`rounded p-3 my-1 bg-success text-white fs-5 ${classes.result}`}
          >
            {state["interval"]}
          </div>
        </>
      )}
    </>
  );
};

export default IntervalSearchBox;
