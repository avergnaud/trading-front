import { useContext } from "react";
import { Context } from "../state/context";

const MainHeader = () => {
  /* global state */
  const [state, dispatch] = useContext(Context);

  let leadText = "Optimisations, Backtesting & bot trading";
  if (state.exchange && state.pair && state.interval) {
    leadText = `Using ${state.exchange} ${state.pair} ${state.interval}`;
  }
  if (state.selectedMinDate && state.selectedMaxDate) {
    leadText += ` from ${state.selectedMinDate
      .toISOString()
      .slice(0, 16)} to ${state.selectedMaxDate.toISOString().slice(0, 16)}`;
  }

  return (
    <header className="my-3 App-header">
      <h1 className="display-1">Brochain.net</h1>
      <p className="lead">{leadText}</p>
      <hr className="my-4" />
    </header>
  );
};

export default MainHeader;
