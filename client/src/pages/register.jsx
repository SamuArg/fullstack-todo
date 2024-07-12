import React, { useState } from "react";
import { TokenContext } from "../App";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import registerRequest from "../api/registerRequest";

const Register = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [token, setToken] = useState(TokenContext);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setPasswordError("Vos mots de passes doivent être identiques.");
      return;
    }
    registerRequest(mail, password).then((response) => {
      alert(response.message);
      navigate("/login");
    });
  };
  return (
    <Container className="p-3 border rounded mt-5">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            required
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            minLength="8"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-danger">{passwordError}</p>
          <p className="form-text">Au moins 8 charactères</p>
        </div>
        <div className="mb-3">
          <label htmlFor="passwordconfirm" className="form-label">
            Confirmé le mot de passe
          </label>
          <input
            type="password"
            id="passwordconfirm"
            className="form-control"
            name="passwordconfirm"
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button
          type="submit"
          id="submitregister"
          className="btn btn-primary mb-3"
        >
          S'inscrire
        </button>
      </form>
      <a
        className="link-primary link-underline-opacity-0"
        href="#"
        onClick={() => navigate("/login")}
      >
        Se connecter
      </a>
    </Container>
  );
};

const Container = styled.div`
  width: 300px;
  margin: auto;
`;

export default Register;
