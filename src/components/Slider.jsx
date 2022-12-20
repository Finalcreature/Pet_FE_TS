import React, { memo, useRef } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
function Slider({ maxValue, minValue, title, handleRanges }) {
  const slider = useRef();

  console.log(slider);

  return (
    <div className="multi-range-slider-container w-50">
      <h6>{title}</h6>
      <div className="d-flex justify-content-center">
        <div className="ms-2">min: {minValue}</div>
        <div className="ms-2">max: {maxValue}</div>
      </div>
      <MultiRangeSlider
        ref={slider}
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
          console.log(e);
          handleRanges(title, e.minValue, e.maxValue);
        }}
      ></MultiRangeSlider>
    </div>
  );
}

export default memo(Slider);
