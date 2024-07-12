import { API_URL } from "./config";

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
  }).then((response) => {
    return response.json();
  });
};
