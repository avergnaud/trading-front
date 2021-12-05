import { useRef, useEffect } from "react";
import { OhlcChartD3 } from "./OhlcChartD3";

const OHLCChart = (props) => {
  /* dans cette div, on laisse d3 gérer le DOM */
  const d3DivReference = useRef(null);

  /* OhlcChartD3.js chart reference */
  const chart = new OhlcChartD3({
    config: props.visual,
  });

  /* seule une modification de props.data doit mettre à jour le graphe */
  useEffect(() => {
    if (props.data && props.data.length > 0 && d3DivReference.current) {
      /* d3DivReference.current est le DOMElement */
      chart.setElement(d3DivReference.current);
      /* on appelle sa méthode draw */
      chart.draw(props.data);
    }
    // eslint-disable-next-line
  }, [props.data]);

  return <div ref={d3DivReference}>Loading...</div>;
};

export default OHLCChart;
