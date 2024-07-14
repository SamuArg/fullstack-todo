import { API_URL } from "./config";

export default (updates, todo, token) => {
  return fetch(`${API_URL}/todos/${todo._id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  }).then((response) => {
    return response.json();
  });
};
