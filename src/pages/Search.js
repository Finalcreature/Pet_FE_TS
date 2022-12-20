import React, { useState, useCallback, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import DropdownSelection from "../components/DropdownSelection";
import { MDBCheckbox, MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import Slider from "../components/Slider";
import MultiRangeSlider from "multi-range-slider-react";

function Search() {
  // const [searchParams, setSearchParams] = useState({});
  const [chosenOption, setChosenOption] = useState({
    type: "Type",
    status: "Status",
  });

  const options = {
    type: ["Dogs", "Cats", "Rabbits"],
    status: ["Available", "Fostered", "Adopted"],
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

  //Change to one object
  const [minValue, setMinValue] = useState(25);
  const [maxValue, setMaxValue] = useState(75);

  // const [height, setHeight] = useState({ min: 0, max: 100 });
  // const [weight, setWeight] = useState({ min: 20, max: 85 });

  //const [tempRange, setTempRange] = useState({});

  const handleRanges = (key, min, max) => {
    //key === "height" ? setHeight({ min, max }) : setWeight({ min, max });
  };

  // const handleRanges = useCallback(
  //   (key, min, max) => {
  //     {
  //       console.log(key, min, max);
  //       console.log(tempRange);
  //       setTempRange({ [key]: { min, max } });

  //       //setRanges({ ...ranges, tempRange });
  //     }
  //   },
  //   [ranges.height.min]
  // );

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

            {/* <Slider
              title={"Height"}
              maxValue={height.max}
              minValue={height.min}
              key={"height"}
              handleRanges={handleRanges}
            />
            <Slider
              title={"Weight"}
              maxValue={weight.max}
              minValue={weight.min}
              key={"weight"}
              handleRanges={handleRanges}
            /> */}
            {/* {Object.keys(ranges).map((char) => {
              return (
                <Slider
                  title={char}
                  maxValue={ranges[char].max}
                  minValue={ranges[char].min}
                  key={char}
                  handleRanges={handleRanges}
                />
              );
            })} */}
          </MDBAccordionItem>
        </MDBAccordion>

        <div className="multi-range-slider-container w-50">
          <h6>Height</h6>
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
              console.log(e);
              setMinValue(e.minValue);
              setMaxValue(e.maxValue);
              // handleRanges("height", e.minValue, e.maxValue);
            }}
          ></MultiRangeSlider>
        </div>
        <Button type="submit" className="mt-4">
          Search
        </Button>
      </Form>
    </div>
  );
}

export default Search;
