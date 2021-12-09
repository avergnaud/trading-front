import { useContext } from "react";
import { Context } from "../../state/context";
import classes from "./OHLCBotsSwitcher.module.css";
import OHLCChartContainer from "../OHLC/OHLCChartContainer";

/*
Ce composant affiche d'abord le marché (ohlc définition)
puis quand le user a sélectionné une plage de dates,
globalState.showAvailableBots passe à true,
et ce composant affiche les bots, à tester pour la plage de dates (selecctedData)
*/
const OHLCBotsSwitcher = (props) => {
  /* global state */
  const [globalState, dispatch] = useContext(Context);

  const showAvailableBots = globalState.showAvailableBots;

  if (showAvailableBots) {
    return <div>Hello bots</div>;
  } else {
    return (
      <>
        <div className="col-md">
          <div className={classes.desc}>
            <span>
              <span className="display-6">
                {props.exchange} {props.pair} {props.interval}
              </span>
            </span>
          </div>
        </div>
        <div className="col-md">
          <OHLCChartContainer
            exchange={props.exchange}
            pair={props.pair}
            interval={props.interval}
            intervalStd={props.intervalStd}
          />
        </div>
      </>
    );
  }
};

export default OHLCBotsSwitcher;
