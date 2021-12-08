import { useRef, useEffect } from "react";
import { SpanGraphD3 } from "./SpanGraphD3";
import classes from "./SpanGraph.module.css";

const SpanGraph = (props) => {

    /* dans cette div, on laisse d3 gérer le DOM */
    const d3DivReference = useRef(null);

  /* SpanGraphD3.js chart reference */
  const chart = new SpanGraphD3({
    config: props.visual,
    cssClasses: {
        simuLine: classes.simuLine,
        simuZoom: classes.simuZoom
    }
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

export default SpanGraph;