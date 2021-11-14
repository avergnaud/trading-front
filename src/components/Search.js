import classes from "./Search.module.css";
import { useState, useEffect } from "react";

const Login = () => {

  const [inputedPair, setInputedPair] = useState("");
  const [availablePairs, setAvailablePairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState("");

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log(`fetching binance pairs after 1 sec ${inputedPair}`);
      fetch("http://localhost:5000/tmp/binance/pairs")
        .then((res) => res.json())
        .then((json) => {
          let tmp = json.filter(element => element.pair && element.pair.includes(inputedPair));
          setAvailablePairs(tmp);
        });
    }, 1000);

    return () => {
      //console.log(`clearTimeout ! ${inputedPair}`);
      clearTimeout(identifier);
    };
  }, [inputedPair]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const inputHandler = (e) => {
    setInputedPair(e.target.value);
  };

  const selectOnChangeHandler = e => {
    setSelectedPair(e.target.value)
  }

  const selectElements = availablePairs.map(element => <option key={element._id} value={element.pair}>{element.pair}</option>);

  return (
    <div className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="pair">Trading pair</label>
          <input
            type="text"
            id="pair"
            value={inputedPair}
            onChange={inputHandler}
            onBlur={inputHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="list">Available pairs</label>
          <select
            id="list"
            size="10"
            value={selectedPair}
            onChange={selectOnChangeHandler}
            onClick={selectOnChangeHandler}
          >
            {selectElements}
          </select>
        </div>
        <div>
            {selectedPair}
        </div>
      </form>
    </div>
  );
};

export default Login;
