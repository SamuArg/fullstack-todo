import React, { useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import { Navigate, Route, Routes } from "react-router-dom";

export const TokenContext = React.createContext(null);
function App() {
  const [token, setToken] = useState(null);
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </TokenContext.Provider>
  );
}

export default App;
