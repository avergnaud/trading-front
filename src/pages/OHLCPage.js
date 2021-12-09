import { useParams } from "react-router-dom";
import OHLCBotsSwitcher from "../components/OHLCBotsSwitcher/OHLCBotsSwitcher";
import SpanGraphContainer from "../components/SpanGraph/SpanGraphContainer";

const OHLCPage = () => {
  let params = useParams();

  // TODO : set le global state avec les params

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
