import React from "react";
import { Dropdown } from "react-bootstrap";
function DropdownSelection({ onSelect, chosenOption, options, att }) {
  return (
    <div>
      <Dropdown onSelect={onSelect} className="my-3">
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {chosenOption}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((option) => (
            <Dropdown.Item
              eventKey={JSON.stringify({ [att]: option })}
              value={option}
              key={option}
            >
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropdownSelection;
