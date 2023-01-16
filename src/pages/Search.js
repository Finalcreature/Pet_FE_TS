import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import DropdownSelection from "../components/DropdownSelection";
import { MDBCheckbox, MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import { usePetContext } from "../libs/PetContext";
import Results from "../components/Results";

function Search() {
  const { fetchSearchedPets, petList } = usePetContext();

  const [chosenOption, setChosenOption] = useState({
    type: "",
    status: [],
    height_category: "",
    weight_category: "",
  });

  const petName = useRef();

  const resetSearch = () => {
    setChosenOption({
      type: "",
      status: [],
      height_category: "",
      weight_category: "",
    });
  };

  const options = {
    type: ["Dog", "Cat"],
    status: ["Available", "Fostered", "Adopted"],
    height_category: ["Short", "Medium", "Tall"],
    weight_category: ["Light", "Medium", "Heavy"],
  };

  const onChecked = ({ target }) => {
    const checkStatus = target.value;
    let currentStatus = chosenOption.status;

    target.checked
      ? currentStatus.push(checkStatus)
      : (currentStatus = currentStatus.filter(
          (status) => status !== checkStatus
        ));

    setChosenOption({ ...chosenOption, status: currentStatus });
  };

  const onSearch = (e) => {
    e.preventDefault();
    const searchParams = { ...chosenOption, name: petName.current.value };
    fetchSearchedPets(searchParams);
  };

  const onSelect = (eventKey) => {
    const attribute = JSON.parse(eventKey);
    const key = Object.keys(attribute)[0];
    const value = attribute[key];
    setChosenOption({ ...chosenOption, [key]: value });
  };

  return (
    <div className="container full-view-height  ">
      <Form onSubmit={onSearch}>
        <DropdownSelection
          onSelect={onSelect}
          chosenOption={chosenOption.type}
          options={options["type"]}
          att={"type"}
          name={"Type"}
        />

        <MDBAccordion className="accordion" borderless>
          <MDBAccordionItem
            className="pb-5"
            collapseId={1}
            headerTitle="Advanced Search"
          >
            <Form.Control
              ref={petName}
              type="text"
              placeholder="Pet Name"
              className="border border-dark accordinon-form-control"
            />

            <div>
              <div className="w-50 d-flex flex-column justify-content-between my-4">
                <h4>Status:</h4>
                {options.status.map((status) => {
                  return (
                    <MDBCheckbox
                      name={status}
                      value={status}
                      id={status}
                      label={status}
                      key={status}
                      onChange={onChecked}
                    />
                  );
                })}
              </div>
            </div>

            <div className="d-flex justify-content-around  ">
              <DropdownSelection
                onSelect={onSelect}
                chosenOption={chosenOption.height_category}
                options={options["height_category"]}
                att={"height_category"}
                name={"Height"}
              />
              <DropdownSelection
                onSelect={onSelect}
                chosenOption={chosenOption.weight_category}
                options={options["weight_category"]}
                att={"weight_category"}
                name={"Weight"}
              />
            </div>
          </MDBAccordionItem>
        </MDBAccordion>

        <div className="d-flex justify-content-end   mt-3">
          <Button
            variant="none"
            className="reset-button shadow-none bg-none"
            onClick={resetSearch}
          >
            Reset
          </Button>
          <Button variant="dark" type="submit">
            Search
          </Button>
        </div>
      </Form>
      <hr />
      <div className="mt-3">
        <Results petList={petList} />
      </div>
    </div>
  );
}

export default Search;
