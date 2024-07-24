import { API_URL } from "./config";
// Creates a request to register as a new user
export default (mail, password) => {
  return fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mail: mail,
      password: password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
};
