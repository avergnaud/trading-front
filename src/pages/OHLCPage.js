import { useParams } from "react-router-dom";
import OHLCChartContainer from "../components/OHLC/OHLCChartContainer";

const OHLCPage = () => {

    let params = useParams();

    return (
        <div className="row">
            <div className="col-md">
                <div>Displays {params.exchange} {params.pair} {params.interval}</div>
            </div>
            <div className="col-md">
                <OHLCChartContainer 
                    exchange={params.exchange}
                    pair={params.pair}
                    interval={params.interval}
                    intervalStd={params.intervalStd}
                />
            </div>
        </div>
    );
};

export default OHLCPage;