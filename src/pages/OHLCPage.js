import { useParams } from "react-router-dom";
import classes from "./OHLCPage.module.css";
import OHLCChartContainer from "../components/OHLC/OHLCChartContainer";
import SpanGraphContainer from "../components/SpanGraph/SpanGraphContainer";

const OHLCPage = () => {
  let params = useParams();

  return (
    <div className="row">
      <div className="col-md">
        <div className={classes.desc}>
          <span>
            <span className="display-6">
              {params.exchange} {params.pair} {params.interval}
            </span>
          </span>
        </div>
      </div>
      <div className="col-md">
        <OHLCChartContainer
          exchange={params.exchange}
          pair={params.pair}
          interval={params.interval}
          intervalStd={params.intervalStd}
        />
      </div>
        <hr className="my-4" />
        <SpanGraphContainer
          exchange={params.exchange}
          pair={params.pair}
          interval={params.interval}
        />
    </div>
  );
};

export default OHLCPage;
