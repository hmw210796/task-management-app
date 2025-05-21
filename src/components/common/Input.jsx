import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 11px 16px;
  border: none;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  background: #d9dfeb 0% 0% no-repeat padding-box;
  color: #7a7d7e;
  transition: border 0.2s;
  font-weight: normal;

  &:focus {
    outline: none;
    border-color: #5b7be2;
  }
`;

export default Input;
