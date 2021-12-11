import { useEffect, useState } from "react";
import IndicatorToast from "../components/Indicators/IndicatorToast";
import { API_URL } from "../constants";

const CalibrationPage = () => {
  const url = `${API_URL}/optimisations/rsitrix`;

  return (
    <>
      <IndicatorToast 
        url={url}
      />
    </>
  );
};

export default CalibrationPage;
