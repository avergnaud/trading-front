import { useContext, useEffect, useState } from "react";
import { Context } from "../../state/context";
import { API_URL } from "../../constants";
import BackTest from "./BackTest";

const Bots = () => {
  /* global state */
  const [globalState, dispatch] = useContext(Context);

  const [bots, setBots] = useState([]);

  const url = `${API_URL}/bots/`;

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          dispatch({ type: "success" });
          return res.json();
        } else {
          dispatch({ type: "error", payload: `error fetching ${url}` });
          return [];
        }
      })
      .then((json) => {
        setBots(json);
      });
  }, []);

  return (
    <>
      <h1 className="display-6">Available bots</h1>
      <div className="accordion" id="accordionPanelsStayOpenExample">
        {bots.map((bot) => (
          <BackTest key={bot} botName={bot} />
        ))}
      </div>
    </>
  );
};

export default Bots;
