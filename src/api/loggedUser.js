import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});