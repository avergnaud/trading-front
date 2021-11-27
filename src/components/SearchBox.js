import classes from "./SearchBox.module.css";
import { useState, useEffect, useContext } from "react";
import { Context } from "../state/context";

const SearchBox = (props) => {
  const url = props.url;
  const name = props.name;

  /* global state */
  const [state, dispatch] = useContext(Context);

  /* local state */
  const [inputValue, setInputValue] = useState("");
  const [availableValues, setAvailableValues] = useState([]);

  useEffect(() => {
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
      .then((json) => setAvailableValues(json));
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
    .map((element) => (
      <option key={element._id} value={element[name]}>
        {element[name]}
      </option>
    ));

  return (
    <>
      <div>
        <label htmlFor={name} className="control-label">
          {props.inputLabel}
        </label>
        <div>
          <input
            type="text"
            id={name}
            value={inputValue}
            onChange={inputHandler}
            onBlur={inputHandler}
          />
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
          className={classes.selectBox}
        >
          {selectElements}
        </select>
      </div>
      <div className={classes.searchResult}>{state[name]}</div>
    </>
  );
};

export default SearchBox;
