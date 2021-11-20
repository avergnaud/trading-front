import classes from "./Search.module.css";
import { useState, useEffect, useContext } from "react";
import { Context } from "../state/context";

const Search = (props) => {

  const url = props.url;
  const name = props.name;

  /* global state */
  const [state, dispatch] = useContext(Context);

  /* local state */
  const [inputValue, setInputValue] = useState("");
  const [availableValues, setAvailableValues] = useState([]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log(`fetching ${url} after 0.5s`);
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          
          let tmp = json.filter(
            (element) => {
              let elementName = element[name] && element[name].toString()
              return element[name] && elementName.includes(inputValue)
            }
          );
          setAvailableValues(tmp);
        });
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [inputValue, url, name]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const selectOnChangeHandler = (e) => {
    dispatch({ type: "field", fieldName: name, payload: e.target.value });
  };

  const selectElements = availableValues.map((element) => (
    <option key={element._id} value={element[name]}>
      {element[name]}
    </option>
  ));

  return (
    <div className="col">
        <div>
          <label htmlFor={name}>{props.inputLabel}</label>
          <input
            type="text"
            id={name}
            value={inputValue}
            onChange={inputHandler}
            onBlur={inputHandler}
          />
        </div>
        <div>
          <label htmlFor="list">{props.availableLabel}</label>
          <select
            id="list"
            size="10"
            value={state[name]}
            onChange={selectOnChangeHandler}
            onClick={selectOnChangeHandler}
          >
            {selectElements}
          </select>
        </div>
        <div>{state[name]}</div>
    </div>
  );
};

export default Search;
