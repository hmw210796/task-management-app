import styled from "styled-components";

const Button = styled.button`
  background: ${({ theme }) => theme.colors.blue};
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  line-height: 18px;
  padding: 11px 22px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #4666b0;
  }

  &:disabled {
    background: #bfc1c2;
    cursor: not-allowed;
  }
`;

export default Button;
