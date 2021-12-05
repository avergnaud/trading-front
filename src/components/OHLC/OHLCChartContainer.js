import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import OHLCChart from "./OHLCChart";
import * as d3 from "d3";

const OHLCChartContainer = (props) => {
  // déplacer dans le state global ?
  const [ohlcs, setOhlcs] = useState([]);

  const url = `${API_URL}/ohlcs/${props.exchange}/${props.pair}/${props.interval}`;

  /* TODO : ? supprimer les tailles ? */
  const visual = {
    innerWidth: 435,
    innerOhlcHeight: 167,
    margin: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 0,
      xaxis: 50,
      yaxis: 50,
    },
    timeFormat: d3.timeFormat("%Y-%m-%d"),
  };

  // pour debug
  window.d3 = d3;

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          //dispatch({ type: "error", payload: `error fetching ${url}` });
          return [];
        }
      })
      .then((json) => {
        let formattedData = json.map((item) => {
          return {
            ...item,
            time: new Date(item.timestamp * 1000),
            timestampms: item.timestamp * 1000
          };
        });
        setOhlcs(formattedData);
      });
  }, []);

  return <OHLCChart data={ohlcs} visual={visual} />;
};

export default OHLCChartContainer;
