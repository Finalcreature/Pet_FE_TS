import React, { memo, useRef, useState } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
function Slider({ minValue, maxValue, title, updateRanges }) {
  const [isFirstRun, setIsFirstRun] = useState(false);
  const [minHeightValue, setMinHeightValue] = useState(25);
  const [maxHeightValue, setMaxHeightValue] = useState(75);

  const [minWeightValue, setMinWeightValue] = useState(25);
  const [maxWeightValue, setMaxWeightValue] = useState(75);
  const handleRanges = (min, max, key) => {
    // if (key === "Height") {
    //   setMinHeightValue(min);
    //   setMaxHeightValue(max);
    // } else {
    //   setMinWeightValue(min);
    //   setMaxWeightValue(max);
    // }
    updateRanges(min, max, key);
  };

  useEffect(() => {
    console.log(isFirstRun);
  });

  return (
    <div className="multi-range-slider-container w-50 my-3">
      <h6>{title}</h6>
      <div className="d-flex justify-content-center">
        <div className="ms-2">min: {minValue}</div>
        <div className="ms-2">max: {maxValue}</div>
      </div>
      <MultiRangeSlider
        min={0}
        max={100}
        step={1}
        ruler={false}
        barLeftColor={"white"}
        barRightColor={"white"}
        barInnerColor={"#74b9ff"}
        minValue={minValue}
        maxValue={maxValue}
        onChange={(e) => {
          console.log(`${title} runs`);
          if (isFirstRun) {
            handleRanges(e.minValue, e.maxValue, title);

            return;
          }
          setIsFirstRun(true);
        }}
      ></MultiRangeSlider>
    </div>
  );
}

export default memo(Slider);
