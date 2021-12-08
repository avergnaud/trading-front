import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import OHLCChart from "./OHLCChart";
import * as d3 from "d3";

const OHLCChartContainer = (props) => {
  // On a un pb de perf d3.js, pour afficher un graphe OHLC avec 36 000 périodes...
  const maxPeriods = 1000;

  // déplacer dans le state global ?
  const [ohlcs, setOhlcs] = useState([]);

  const url = `${API_URL}/ohlcs/${props.exchange}/${props.pair}/${props.interval}?last=${maxPeriods}`;

  /* calibrage xAxis pour [30m] */
  let factor = 1;
  let timeFormat = d3.timeFormat("%m-%d %Hh");
  let getMaxDate = (date) => {
    let newDate = date;
    newDate.setHours(date.getHours() + 1);
    return newDate;
  };
  /* calibrage pour les autres intervales standard */
  switch (props.intervalStd) {
    case "1h":
      factor = 2;
      break;
    case "2h":
      factor = 4;
      break;
    case "4h":
      factor = 8;
      break;
    case "6h":
      factor = 12;
      break;
    case "8h":
      factor = 16;
      break;
    case "12h":
      factor = 24;
      timeFormat = d3.timeFormat("%Y-%m-%d");
      break;
    case "1d":
      factor = 48;
      timeFormat = d3.timeFormat("%Y-%m-%d");
      getMaxDate = (date) => {
        let newDate = date;
        newDate.setDate(date.getDate() + 1);
        return newDate;
      };
      break;
    case "1w":
      factor = 336;
      timeFormat = d3.timeFormat("%Y-%m-%d");
      getMaxDate = (date) => {
        let newDate = date;
        newDate.setDate(date.getDate() + 7);
        return newDate;
      };
      break;
    default:
      console.log(`Sorry`);
  }
  const getMinDate = (date) => {
    let newDate = date;
    newDate.setHours(date.getHours() - factor * 16);
    return newDate;
  };

  /* 
  innerWidth et innerOhlcHeight : ne compte que pour la forme du graphe (ratio innerWidth/innerOhlcHeight)
  */
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
    timeFormat: timeFormat,
    getMinDate: getMinDate,
    getMaxDate: getMaxDate,
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
            timestampms: item.timestamp * 1000,
          };
        });
        setOhlcs(formattedData);
      });
  }, []);

  return <OHLCChart data={ohlcs} visual={visual} />;
};

export default OHLCChartContainer;
