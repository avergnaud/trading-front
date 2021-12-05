import { useParams } from "react-router-dom";
import OHLCChartContainer from "../components/OHLC/OHLCChartContainer";

const OHLCPage = () => {

    let params = useParams();

    return (
        <>
            <div>Displays {params.exchange} {params.pair} {params.interval}</div>
            <OHLCChartContainer 
                exchange={params.exchange}
                pair={params.pair}
                interval={params.interval}
            />
        </>
    );
};

export default OHLCPage;