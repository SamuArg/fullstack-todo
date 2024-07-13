import { useState } from "react";
import loginRequest from "../api/loginRequest";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    loginRequest(mail, password)
      .then(({ token }) => {
        localStorage.setItem("token", token);
        navigate("/");
      })
      .catch(() => {
        setErrorMessage("Identification échouée");
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
        <p className="text-danger">{errorMessage}</p>
        <button type="submit" className="btn btn-primary mb-3">
          Se connecter
        </button>
      </form>
      <a
        className="link-primary link-underline-opacity-0"
        href="#"
        onClick={() => navigate("/register")}
      >
        S'inscrire
      </a>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  width: 300px;
`;

export default Login;
