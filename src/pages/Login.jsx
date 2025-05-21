import { useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Card from "../components/common/Card";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: #f4f4f6 0% 0% no-repeat padding-box;
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 296px;
`;

const Title = styled.p`
  font-size: 18px;
  color: #537178;
  margin-bottom: 1.5rem;
  text-align: left;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 14px;
  margin-top: 0.5rem;
  text-align: center;
`;

const Login = ({ setIsAuthenticated }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // For demo purposes, we'll use a simple authentication
    if (id && name) {
      // Set a session cookie that expires when the browser is closed
      sessionStorage.setItem("sessionToken", `${id}_token`);
      sessionStorage.setItem("name", name);
      setIsAuthenticated(true);
    } else {
      setError("Please fill in ID and name.");
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Login</Button>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
