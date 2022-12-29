import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import DropdownSelection from "../components/DropdownSelection";
import { MDBCheckbox, MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import { usePetContext } from "../libs/PetContext";
import Results from "../components/Results";

function Search() {
  const { fetchSearchedPets } = usePetContext();

  const [chosenOption, setChosenOption] = useState({
    type: "",
    status: [],
    height_category: "",
    weight_category: "",
  });

  const petName = useRef();

  const options = {
    type: ["Dogs", "Cats", "Rabbits"],
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

    console.log(searchParams);
    fetchSearchedPets(searchParams);
  };

  const onSelect = (eventKey) => {
    const attribute = JSON.parse(eventKey);
    const key = Object.keys(attribute)[0];
    const value = attribute[key];
    setChosenOption({ ...chosenOption, [key]: value });
  };

  return (
    <div className="container">
      <Form onSubmit={onSearch}>
        <DropdownSelection
          onSelect={onSelect}
          chosenOption={chosenOption.type}
          options={options["type"]}
          att={"type"}
          name={"Type"}
        />

        <MDBAccordion borderless>
          <MDBAccordionItem collapseId={1} headerTitle="Advanced Search">
            <div className="w-50 my-3">
              <Form.Control ref={petName} type="text" placeholder="Pet Name" />
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
                    onChange={onChecked}
                  />
                );
              })}
            </div>

            <div className="d-flex justify-content-around w-50">
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
