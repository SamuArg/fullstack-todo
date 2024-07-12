import React, { useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Homepage from "./pages/homepage";

export const TokenContext = React.createContext(null);
function App() {
  const [token, setToken] = useState(null);
  return (
    <TokenContext.Provider value={[token, setToken]}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
      </Routes>
    </TokenContext.Provider>
  );
}

export default App;
