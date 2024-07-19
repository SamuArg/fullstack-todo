import { API_URL } from "./config";
//Crée une requête pour lire tous les tâches d'un utilisateur
export default (token) => {
  return fetch(`${API_URL}/todos`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
};
