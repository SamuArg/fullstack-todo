import { API_URL } from "./config";

export default (todo, token) => {
  return fetch(`${API_URL}/todos/:${todo.id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
};
