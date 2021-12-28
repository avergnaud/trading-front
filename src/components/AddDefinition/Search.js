import { useContext } from "react";
import { Context } from "../../state/context";
import SearchBox from "./SearchBox";
import IntervalSearchBox from "./IntervalSearchBox";
import CronBox from "./UpdateRateBox";
import { API_URL } from "../../constants";

const EXCHANGES_ENDPOINT = `${API_URL}/exchanges`;

const Search = () => {
  /* global state */
  const [state, dispatch] = useContext(Context);

  return (
    <div className="row mt-5">
      <h1 className="display-6">Add a new OHLC definition:</h1>
      <div className="col-lg border border-success m-1">
        <SearchBox
          name="exchange"
          inputLabel="Exchange"
          url={EXCHANGES_ENDPOINT}
        />
      </div>
      <div className="col-lg border border-success m-1">
        <SearchBox
          name="pair"
          inputLabel="Pair"
          url={`${EXCHANGES_ENDPOINT}/${state.exchange}/pairs`}
        />
      </div>
      <div className="col-lg border border-success m-1">
        <IntervalSearchBox
          url={`${EXCHANGES_ENDPOINT}/${state.exchange}/intervals`}
        />
      </div>
      <div className="col-lg border border-success m-1">
        <CronBox />
      </div>
    </div>
  );
};

export default Search;
