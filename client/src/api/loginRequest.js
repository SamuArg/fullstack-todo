import { API_URL } from "./config";
// Makes a request to log in
export default (mail, password) => {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mail: mail,
      password: password,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Identification échouée");
    }
  });
};
