import React from "react";
import { Dropdown } from "react-bootstrap";

interface DropdownSelectionProps {
  onSelect: (eventKey: any) => void;
  chosenOption: string;
  options: string[];
  att: string;
  name: string;
}

const DropdownSelection: React.FC<DropdownSelectionProps> = ({
  onSelect,
  chosenOption,
  options,
  att,
  name,
}) => {
  return (
    <div>
      <Dropdown onSelect={onSelect} className="my-3">
        <Dropdown.Toggle
          variant="none"
          className="bg-orange text-light disable-hover"
          id="dropdown-basic"
        >
          {chosenOption || name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((option: string) => (
            <Dropdown.Item
              eventKey={JSON.stringify({ [att]: option })}
              value={option}
              key={option}
            >
              {option + "s"}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownSelection;
