import { useEffect, useState } from "react";
import Loader from "../../UI/Loader";

const IndicatorImgResult = (props) => {
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
    );

};

export default IndicatorImgResult;