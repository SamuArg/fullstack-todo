import { API_URL } from "./config";

// Creates a request to create a new task
export default (todo, token) => {
  return fetch(`${API_URL}/addTodo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      date: todo.date,
      urgent: todo.urgent,
    }),
  }).then((response) => {
    return response.json();
  });
};
