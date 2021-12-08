import { useState, useEffect } from "react";
import SpanGraph from "./SpanGraph";
import { API_URL } from "../../constants";
import * as d3 from "d3";

const SpanGraphContainer = (props) => {

    const url = `${API_URL}/ohlcs/${props.exchange}/${props.pair}/${props.interval}`;

    let timeFormat = d3.timeFormat("%m-%d %Hh");// inutile

    const [ohlcs, setOhlcs] = useState([]);

    const visual = {
      margin: { top: 50, right: 30, bottom: 110, left: 40 },
      margin2: { top: 430, right: 30, bottom: 30, left: 40 },
      outerWidth: 960,
      outerHeight: 500,
      outerHeight2: 500,
      legendOffset: 20,
      yMargin: 30,
      timeFormat: timeFormat
    };

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
              closingPrice: item.close,/* redondant tmp */
              timeEpochTimestamp: item.timestamp,/* redondant tmp */
              date: new Date(item.timestamp * 1000),
              timestampms: item.timestamp * 1000,
            };
          });
          setOhlcs(formattedData);
        });
    }, [url]);

    return <SpanGraph data={ohlcs} visual={visual} />;
};

export default SpanGraphContainer;