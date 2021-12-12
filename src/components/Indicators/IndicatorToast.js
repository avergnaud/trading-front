import { useState } from "react";
import classes from "./IndicatorToast.module.css";
import IndicatorImgResult from "./IndicatorImgResult";

const IndicatorToast = (props) => {
  const [show, setShow] = useState(false);

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
          onClick={() => setShow(false)}
        ></button>
      </div>
      {!show && (
        <div className={`d-flex justify-content-center align-items-center ${classes.beforeToastBody}`}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShow(true)}
          >
            Calibrate
          </button>
        </div>
      )}
      {show && <IndicatorImgResult url={props.url} />}
    </div>
  );
};

export default IndicatorToast;
