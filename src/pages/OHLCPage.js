import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Context } from "../state/context";
import OHLCBotsSwitcher from "../components/OHLCBotsSwitcher/OHLCBotsSwitcher";
import SpanGraphContainer from "../components/SpanGraph/SpanGraphContainer";

const OHLCPage = () => {
  /* global state */
  const [state, dispatch] = useContext(Context);

  // TMP
  console.log(state.selectedMinDate && state.selectedMinDate.getTime()/1000)
  console.log(state.selectedMaxDate && state.selectedMaxDate.getTime()/1000)

  let params = useParams();

  /* cas où on arrive directement sur cette page */
  useEffect(() => {
    dispatch({
      type: "SELECT_MARKET",
      payload: {
        exchange: params.exchange,
        pair: params.pair,
        interval: params.interval,
      },
    });
  }, [])

  return (
    <div className="row">
      <SpanGraphContainer
        exchange={params.exchange}
        pair={params.pair}
        interval={params.interval}
      />
      <hr className="my-4" />
      <OHLCBotsSwitcher
        exchange={params.exchange}
        pair={params.pair}
        interval={params.interval}
        intervalStd={params.intervalStd}
      />
    </div>
  );
};

export default OHLCPage;
