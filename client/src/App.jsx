import Login from "./pages/login";
import Register from "./pages/register";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Homepage from "./pages/homepage";
// Manages routes
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
