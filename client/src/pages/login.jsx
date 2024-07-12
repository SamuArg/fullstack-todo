import React, { useState } from "react";
import loginRequest from "../api/loginRequest";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../App.jsx";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(TokenContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    loginRequest(mail, password)
      .then(({ token }) => {
        setToken(token);
        navigate("login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container className="p-3 border rounded mt-5">
      <h1>Se Connecter</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            required
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Login
        </button>
      </form>
      <p>Don't have an account ?</p>
      <a className="link-danger link-underline-opacity-0" href="#">
        Register
      </a>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  width: 300px;
`;

export default Login;
