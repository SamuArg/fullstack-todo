import { API_URL } from "./config";
// Creates a request to delete a task
export default (todo, token) => {
  return fetch(`${API_URL}/todos/${todo._id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
};
