import { useState, useRef, useEffect, useContext } from "react";
import { Context } from "../../state/context";
import { SpanGraphD3 } from "./SpanGraphD3";
import Loader from "../../UI/Loader";
import classes from "./SpanGraph.module.css";

const SpanGraph = (props) => {
  /* global state */
  const [globalState, dispatch] = useContext(Context);

  const now = new Date();
  let oneYearBefore = new Date();
  oneYearBefore.setFullYear(now.getFullYear() - 1);

  const [state, setState] = useState({
    dateMin: oneYearBefore,
    dateMax: now,
    isLoading: false,
  });

  const spanChangeHandler = ([dateMin, dateMax]) => {
    setState((previousState) => ({
      ...previousState,
      dateMin: dateMin,
      dateMax: dateMax,
    }));
  };

  /* dans cette div, on laisse d3 gérer le DOM */
  const d3DivReference = useRef(null);

  /* SpanGraphD3.js chart reference */
  const chart = new SpanGraphD3({
    config: props.visual,
    cssClasses: {
      simuLine: classes.simuLine,
      simuZoom: classes.simuZoom,
    },
    dateMin: state.dateMin,
    dateMax: state.dateMax,
    onSpanChange: spanChangeHandler,
  });

  /* seule une modification de props.data doit mettre à jour le graphe */
  useEffect(() => {
    if (props.data && props.data.length > 0 && d3DivReference.current) {
      /* d3DivReference.current est le DOMElement */
      chart.setElement(d3DivReference.current);
      /* on appelle sa méthode draw */
      chart.draw(props.data);
    }
  }, [props.data]);

  /* y a sûrement une meilleure impl à la façon "react" */
  const onMinDateInputChange = (event) => {
    const newDateString = event.target.value;
    const newDate = new Date(newDateString);
    chart.dateMin = newDate;
    chart.setElement(d3DivReference.current);
    chart.draw(props.data);
    setState((previousState) => ({
      ...previousState,
      dateMin: newDate,
    }));
  };

  const onMaxDateInputChange = (event) => {
    const newDateString = event.target.value;
    const newDate = new Date(newDateString);
    chart.dateMax = newDate;
    chart.setElement(d3DivReference.current);
    chart.draw(props.data);
    setState((previousState) => ({
      ...previousState,
      dateMax: newDate,
    }));
  };

  const useClickHandler = () => {
    const selectedData = props.data.filter(
      (data) => data.date >= state.dateMin && data.date <= state.dateMax
    );
    dispatch({
      type: "USE_OHLC_DATA",
      payload: selectedData,
    });
  };

  // ? date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  const nowString = now.toISOString().slice(0, 16);
  const dateMinString = state.dateMin.toISOString().slice(0, 16);
  const dateMaxString = state.dateMax.toISOString().slice(0, 16);

  return (
    <>
      <div className={`row ${classes.datesInput}`}>
        <div className="card">
          <div className="card-body">
            <button
              className={`btn btn-outline-success btn-lg`}
              onClick={useClickHandler}
            >
              Use {props.exchange} {props.pair} {props.interval}
            </button>
            <span className="col-auto mx-3">
              <label htmlFor="from-time" className="col-form-label">
                From
              </label>
            </span>
            <input
              type="datetime-local"
              id="from-time"
              name="from-time"
              value={dateMinString}
              min="2015-01-01T00:00"
              max={nowString}
              onChange={onMinDateInputChange}
              required
            ></input>
            <span className="col-auto mx-3">
              <label htmlFor="from-time" className="col-form-label">
                to
              </label>
            </span>
            <input
              type="datetime-local"
              id="to-time"
              name="to-time"
              value={dateMaxString}
              min="2015-01-01T00:00"
              max={nowString}
              onChange={onMaxDateInputChange}
              required
            ></input>
          </div>
        </div>
      </div>
      <div ref={d3DivReference} className="d-flex justify-content-center">
        <Loader />
      </div>
    </>
  );
};

export default SpanGraph;
