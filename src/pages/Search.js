import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import DropdownSelection from "../components/DropdownSelection";
import { MDBCheckbox, MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import Slider from "../components/Slider";
import Results from "../components/Results";

function Search() {
  const [searchParams, setSearchParams] = useState({});
  const [chosenOption, setChosenOption] = useState({
    type: "Type",
    status: "Status",
    height: "Height",
  });

  const options = {
    type: ["Dogs", "Cats", "Rabbits"],
    status: ["Available", "Fostered", "Adopted"],
    height: ["short", "medium", "tall"],
  };

  const onSearch = (e) => {
    e.preventDefault();

    console.log("Submited");
  };

  const onSelect = (eventKey) => {
    const attribute = JSON.parse(eventKey);
    const key = Object.keys(attribute)[0];
    const value = attribute[key];
    setChosenOption({ ...chosenOption, [key]: value });
  };

  // const [minHeightValue, setMinHeightValue] = useState(25);
  // const [maxHeightValue, setMaxHeightValue] = useState(75);

  // const [minWeightValue, setMinWeightValue] = useState(25);
  // const [maxWeightValue, setMaxWeightValue] = useState(75);
  // const [currentKey, setCurrentKey] = useState("");
  // const [sliderUpdateNow, setSliderUpdateNow] = useState(0);
  // const [lastUpdate, setLastUpdate] = useState(0);

  // useEffect(() => {
  //   if (lastUpdate !== sliderUpdateNow) {
  //     updateRanges();
  //     setSliderUpdateNow(lastUpdate);
  //   }
  // }, [sliderUpdateNow]);

  // const handleRanges = (min, max, key) => {
  //   if (key === "Height") {
  //     setMinHeightValue(min);
  //     setMaxHeightValue(max);
  //   } else {
  //     setMinWeightValue(min);
  //     setMaxWeightValue(max);
  //   }
  //   // setCurrentKey(key);
  //   // setLastUpdate((c) => c + 1);
  // };
  // const updateRanges = (min, max, key) => {
  //   //   // console.log("called");
  //   //   let min, max;
  //   //   if (currentKey === "Height") {
  //   //     min = minHeightValue;
  //   //     max = maxHeightValue;
  //   //   } else {
  //   //     min = minWeightValue;
  //   //     max = maxWeightValue;
  //   //   }
  //   setChosenOption((option) => {
  //     // console.log({ ...option, [currentKey]: [min, max] });
  //     return { ...option, [key]: [min, max] };
  //   });
  // };

  // const handleHeight = (min, max, key) => {
  //   setMinHeightValue(min);
  //   setMaxHeightValue(max);
  //   setChosenOption({ ...chosenOption, [key]: [min, max] });
  // };
  // const handleWeight = (min, max, key) => {
  //   setMinWeightValue(min);
  //   setMaxWeightValue(max);
  //   setChosenOption({ ...chosenOption, [key]: [min, max] });
  // };

  // const [ranges, setRanges] = useState({
  //   height: { min: 25, max: 75 },
  //   weight: { min: 0, max: 100 },
  // });

  return (
    <div className="container">
      <Form onSubmit={onSearch}>
        <DropdownSelection
          onSelect={onSelect}
          chosenOption={chosenOption.type}
          options={options["type"]}
          att={"type"}
        />

        <MDBAccordion borderless>
          <MDBAccordionItem collapseId={1} headerTitle="Advanced Search">
            <div className="w-50 my-3">
              <Form.Control type="text" placeholder="Pet Name" />
            </div>
            <h4>Status:</h4>
            <div className="w-50 d-flex justify-content-between my-4">
              {options.status.map((status) => {
                return (
                  <MDBCheckbox
                    name={status}
                    value={status}
                    id={status}
                    label={status}
                    key={status}
                  />
                );
              })}
            </div>
            {/* {Object.keys(ranges).map((att) => {
              const value = ranges[att];
              console.log(value);
              return (
                <Slider
                  minValue={value.min}
                  maxValue={value.max}
                  title={att}
                  key={att}
                  handleRanges={handleRanges}
                />
              );
            })} */}

            {/* <Slider
              minValue={0}
              maxValue={100}
              title="Height"
              // handleRanges={handleRanges}
              updateRanges={updateRanges}
              // handleRanges={handleHeight}
            />
            <Slider
              minValue={25}
              maxValue={75}
              title="Weight"
              // handleRanges={handleRanges}
              updateRanges={updateRanges}
              //handleRanges={handleWeight}
            /> */}

            <DropdownSelection
              onSelect={onSelect}
              chosenOption={chosenOption.height}
              options={options["height"]}
              att={"height"}
            />
          </MDBAccordionItem>
        </MDBAccordion>

        {/* <div className="multi-range-slider-container w-50">
          <h6>Height</h6>
          <div className="d-flex justify-content-center">
            <div className="ms-2">min: {minHeightValue}</div>
            <div className="ms-2">max: {maxHeightValue}</div>
          </div>
          <MultiRangeSlider
            min={0}
            max={100}
            step={1}
            ruler={false}
            barLeftColor={"white"}
            barRightColor={"white"}
            barInnerColor={"#74b9ff"}
            minValue={minHeightValue}
            maxValue={maxHeightValue}
            onChange={(e) => {
              handleRanges(e.minValue, e.maxValue);
            }}
          ></MultiRangeSlider>
        </div> */}
        <Button type="submit" className="mt-4">
          Search
        </Button>
      </Form>
      <hr />
      <div className="mt-3">
        <Results />
      </div>
    </div>
  );
}

export default Search;
