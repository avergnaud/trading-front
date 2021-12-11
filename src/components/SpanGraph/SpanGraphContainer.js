import { useState, useEffect } from "react";
import SpanGraph from "./SpanGraph";
import { API_URL } from "../../constants";
import Loader from "../../UI/Loader";
import * as d3 from "d3";

const SpanGraphContainer = (props) => {

    const url = `${API_URL}/ohlcs/${props.exchange}/${props.pair}/${props.interval}`;

    let timeFormat = d3.timeFormat("%m-%d %Hh");// inutile

    const [localState, setLocalState] = useState({
      ohlcs: [],
      dateMin: null,
      dateMax: null,
      isLoading: true
    });

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
      setLocalState(previousState => ({
        ...previousState,
        isLoading: true
      }));
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
          const dates = formattedData.map(data => data.date);
          const minDate = new Date(Math.min(...dates));
          const maxDate = new Date(Math.max(...dates));
          setLocalState(previousState => ({
            ...previousState,
            dateMin: minDate,
            dateMax: maxDate,
            isLoading: false,
            ohlcs: formattedData
          }));
        });
    }, [url]);

    if(localState.isLoading) {
      return (
        <div className="d-flex justify-content-center">
          <Loader />
        </div>
        );
    } else {
      return <SpanGraph 
        exchange={props.exchange}
        pair={props.pair}
        interval={props.interval}
        data={localState.ohlcs} 
        dateMin={localState.dateMin}
        dateMax={localState.dateMax}
        visual={visual} />;
    }
};

export default SpanGraphContainer;