import { useContext } from "react";
import { Context } from "../state/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import classes from "./Definition.module.css";
import { API_URL } from "../constants";

const Definition = (props) => {
  /* global state */
  const [state, dispatch] = useContext(Context);

  const clickHandler = () => {
    fetch(`${API_URL}/ohlc_definitions`, {
      method: "delete",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exchange: props.exchange,
        pair: props.pair,
        interval: props.interval,
      }),
    }).then((res) => {
      dispatch({ type: "remove_definition", payload: props.id });
    });
  };

  return (
    <tr className={classes.middle}>
      <td>{props.exchange}</td>
      <td>{props.pair}</td>
      <td>{props.interval}</td>
      <td>{props.update_rate}</td>
      <td>
        <button type="button" className="btn btn-lg" onClick={clickHandler}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default Definition;
