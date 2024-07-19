import { API_URL } from "./config";
//Crée une requête pour supprimer une tâche
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
