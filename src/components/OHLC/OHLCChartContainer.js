import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import OHLCChart from "./OHLCChart";
import * as d3 from "d3";

const OHLCChartContainer = (props) => {
  // On a un pb de perf d3.js, pour afficher un graphe OHLC avec 36 000 périodes...
  const maxPeriods = 1000;

  // déplacer dans le state global ?
  const [ohlcs, setOhlcs] = useState([]);

  const url = `${API_URL}/ohlcs/${props.exchange}/${props.pair}/${props.interval}?last=1000`;

  /* calibrage xAxis pour [30m] */
  let getMinDate = (date) => {
    let newDate = date;
    newDate.setHours(date.getHours() - 16);
    return newDate;
  };
  let getMaxDate = (date) => {
    let newDate = date;
    newDate.setHours(date.getHours() + 1);
    return newDate;
  };
  let timeFormat = d3.timeFormat("%m-%d %Hh");
  switch (props.intervalStd) {
    case "1h":
      getMinDate = (date) => {
        let newDate = date;
        newDate.setHours(date.getHours() - 32);
        return newDate;
      };
      break;
    case "4h":
      getMinDate = (date) => {
        let newDate = date;
        newDate.setHours(date.getHours() - 128);
        return newDate;
      };
      break;
    case "1d":
      getMinDate = (date) => {
        let newDate = date;
        newDate.setHours(date.getHours() - 6*128);
        return newDate;
      };
      timeFormat = d3.timeFormat("%Y-%m-%d");
      break;
      case "1w":
        getMinDate = (date) => {
          let newDate = date;
          newDate.setHours(date.getHours() - 7*6*128);
          return newDate;
        };
        timeFormat = d3.timeFormat("%Y-%m-%d");
        break;
    default:
      console.log(`Sorry`);
  }

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
