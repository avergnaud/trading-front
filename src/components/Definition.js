import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../state/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import classes from "./Definition.module.css";
import { API_URL } from "../constants";

const Definition = (props) => {

  let navigate = useNavigate();

  /* global state */
  const [state, dispatch] = useContext(Context);

  const deleteClickHandler = () => {
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

  const clickHandler = (e) => {
    navigate(`/ohlc/${props.exchange}/${props.pair}/${props.interval}`);
  };

  return (
    <tr className={classes.middle}>
      <td onClick={clickHandler}>{props.exchange}</td>
      <td onClick={clickHandler}>{props.pair}</td>
      <td onClick={clickHandler}>{props.interval}</td>
      <td onClick={clickHandler}>{props.update_rate}</td>
      <td className={`bg-warning ${classes.deleteTd}`}>
        <button type="button" className="btn btn-lg" onClick={deleteClickHandler}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default Definition;
