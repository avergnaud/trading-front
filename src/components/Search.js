import { useContext } from "react";
import { Context } from "../state/context";
import SearchBox from "./SearchBox";

const EXCHANGES_ENDPOINT = 'http://localhost:5000/exchanges';

const Search = () => {

  /* global state */
  const [state, dispatch] = useContext(Context);

  const cronChangeHandler = event => {
    dispatch({ type: 'field', payload: event.target.value })
  }

  return (
    <div className="row">
      <div className="col">
        <SearchBox
          name="exchange"
          inputLabel="Exchange"
          url={EXCHANGES_ENDPOINT}
        />
      </div>
      <div className="col">
        <SearchBox
          name="pair"
          inputLabel="Pair"
          url={`${EXCHANGES_ENDPOINT}/${state.exchange}/pairs`}
        />
      </div>
      <div className="col">
        <SearchBox
          name="interval"
          inputLabel="Interval"
          url={`${EXCHANGES_ENDPOINT}/${state.exchange}/intervals`}
        />
      </div>
      <div className="col">
        <label htmlFor="cron" className="control-label">
          cron
        </label>
        <div>
          <input
            type="text"
            id="cron"
            value={state.cron}
            onChange={cronChangeHandler}
            onBlur={cronChangeHandler}
          />
        </div>
        <div>
          <a href="https://crontab.guru/" target="_blank" rel="noreferrer">
            crontab.guru
          </a>
        </div>
      </div>
    </div>
  );
};

export default Search;