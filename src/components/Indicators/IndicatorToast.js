import { useEffect, useState } from "react";
import classes from "./IndicatorToast.module.css";
import Loader from "../../UI/Loader";

const IndicatorToast = (props) => {
  const [localState, setLocalState] = useState({
    base64img: "",
    isLoading: false,
  });

  useEffect(() => {
    setLocalState((previousState) => ({
      ...previousState,
      isLoading: true,
    }));
    fetch(props.url)
      .then((response) => response.text())
      .then((text) =>
        setLocalState((previousState) => ({
          ...previousState,
          base64img: text,
          isLoading: false,
        }))
      );
  }, []);

  return (
    <div
      className={`toast show ${classes.customToast}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="me-auto">TRIX_HISTO + STOCH_RSI</strong>
        <small>[7, 30]</small>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">
        {localState.isLoading && (
          <div className="d-flex justify-content-center">
            <Loader />
          </div>
        )}
        {!localState.isLoading && (
          <img
            alt="scatterPlot"
            src={`data:image/jpeg;base64,${localState.base64img}`}
          />
        )}
      </div>
    </div>
  );
};

export default IndicatorToast;
