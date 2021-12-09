import {useEffect, useState} from "react";
import {API_URL} from "../constants";

const CalibrationPage = () => {

    const url = `${API_URL}/optimisations`

    const [base64img, setBase64img] = useState("");

    useEffect(() => {
            console.log("fetching")
            fetch(url)
                .then(response => response.text())
                .then(text => setBase64img(text))
        },
        []);

    return (<><h1>Indicators Calibration</h1>
        <img alt="scatterPlot" src={`data:image/jpeg;base64,${base64img}`} />
        </>);
        };


        export default CalibrationPage;
