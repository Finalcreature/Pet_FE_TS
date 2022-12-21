import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { usePetContext } from "../libs/PetContext";

function PetForm() {
  const [petInfo, setPetInfo] = useState({ name: "", type: "" });

  const { addPet } = usePetContext();

  const handlePetInfo = (e) => {
    setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPet = { name: petInfo.name, type: petInfo.type };

      const res = await axios.post("http://localhost:8080/pets", newPet);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form.Control
        onChange={handlePetInfo}
        placeholder="Name..."
        value={petInfo.name}
        name="name"
      ></Form.Control>
      <Form.Control
        onChange={handlePetInfo}
        placeholder="Type..."
        value={petInfo.type}
        name="type"
      ></Form.Control>

      <button type="submit">Submit</button>
    </form>
  );
}

export default PetForm;
