import styled from "styled-components";
import Cookies from "js-cookie";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const StyledHeader = styled.header`
  background-color: #fff;
  box-shadow: 0px 3px 6px #00000029;
  margin-bottom: 0.75rem;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  max-width: 960px;
  min-height: 4.5rem;
  margin: auto;
`;

const HeaderImage = styled.img`
  width: 48px;
  height: 48px;
`;

const TitleName = styled.p`
  font-size: 24px;
  color: #333;
  margin: 0 auto 0 1rem;
`;

const LogoutButton = styled(Button)`
  background: none;
  border: none;
  color: #6d8187;
  padding: 0;

  &:hover {
    background: none;
  }
`;

const Header = () => {
  const { setIsAuthenticated } = useAuth();
  const [name, setName] = useState("");

  const handleLogout = () => {
    Cookies.remove("sessionToken");
    sessionStorage.clear();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    setName(storedName);
  }, []);

  return (
    <StyledHeader>
      <HeaderContent>
        <HeaderImage src="/images/donn-gabriel-baleva.png" />
        <TitleName>{name}</TitleName>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;
