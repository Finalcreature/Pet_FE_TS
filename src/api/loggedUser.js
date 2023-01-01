import axios from "axios";

let token = "";

export function callback(recievedToken) {
  console.log(recievedToken);
  token = recievedToken;
}

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    authorization: `Bearer ${token}`,
  },
});
