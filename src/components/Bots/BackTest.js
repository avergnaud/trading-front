import { useContext, useState } from "react";
import { Context } from "../../state/context";
import { API_URL } from "../../constants";
import Loader from "../../UI/Loader";

const BackTest = (props) => {
  /* global state */
  const [globalState, dispatch] = useContext(Context);

  /* local state */
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  let url = `${API_URL}/bots/${props.botName}/backtest`;
  url += `?exchange=${globalState.exchange}`;
  url += `&pair=${globalState.pair}`;
  url += `&interval=${globalState.interval}`;
  const fromTimestampSeconds = Math.round(
    globalState.selectedMinDate.getTime() / 1000
  );
  url += `&from_timestamp_s=${fromTimestampSeconds}`;
  const toTimestampSeconds = Math.round(
    globalState.selectedMaxDate.getTime() / 1000
  );
  url += `&to_timestamp_s=${toTimestampSeconds}`;

  const clickHandler = (event) => {
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch({ type: "error", payload: `error fetching ${url}` });
          return {};
        }
      })
      .then((json) => {
        setIsLoading(false);
        setResult(json);
      });
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="panelsStayOpen-headingOne">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseOne"
          aria-expanded="true"
          aria-controls="panelsStayOpen-collapseOne"
        >
          {props.botName}
        </button>
      </h2>
      <div
        id="panelsStayOpen-collapseOne"
        className="accordion-collapse collapse show"
        aria-labelledby="panelsStayOpen-headingOne"
      >
        <div className="accordion-body">
          <strong>{props.botName} résultats</strong>
          <div>
            <button onClick={clickHandler}>Backtest</button>
          </div>
          <div>
              {isLoading && <Loader />}
              {!isLoading && JSON.stringify(result) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackTest;
