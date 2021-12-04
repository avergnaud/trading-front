import classes from "./SearchBox.module.css";
import { useState, useEffect, useContext } from "react";
import { Context } from "../state/context";
import Loader from "../UI/Loader";

const SearchBox = (props) => {
  const url = props.url;
  const name = props.name;

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
  }, [url, name, dispatch]);

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const selectOnChangeHandler = (e) => {
    //setInputValue(e.target.value);
    dispatch({ type: "field", fieldName: name, payload: e.target.value });
  };

  const selectElements = availableValues
    .filter((element) => {
      let elementName = element[name] && element[name].toString();
      return element[name] && elementName.includes(inputValue);
    })
    .map((element) => {
      if(element['allowed'] === false) {
        return (
          <option key={element._id} value="" disabled>
            {element[name]}
          </option>
        );
      }
      return (
        <option key={element._id} value={element[name]}>
          {element[name]}
        </option>
      );
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
            <label htmlFor={name} className="control-label">
              {props.inputLabel}
            </label>
          </p>
          <div className="row my-1">
            <div className="col-10">
              <input
                type="text"
                id={name}
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
              value={state[name]}
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
            {state[name]}
          </div>
        </>
      )}
    </>
  );
};

export default SearchBox;
