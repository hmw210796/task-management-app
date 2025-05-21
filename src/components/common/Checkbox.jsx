import React from "react";
import styled from "styled-components";

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #fff;
  border: 2px solid #95a4ab;
  border-radius: 4px;
  transition: all 0.2s;
  cursor: pointer;

  svg {
    visibility: ${({ checked }) => (checked ? "visible" : "hidden")};
  }
`;

const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const CustomCheckbox = ({ checked, onChange, ...props }) => (
  <CheckboxContainer>
    <HiddenCheckbox checked={checked} onChange={onChange} {...props} />
    <StyledCheckbox checked={checked}>
      <svg width="17" height="14" viewBox="0 0 14 14">
        <polyline
          points="2 8 6 12 12 3"
          fill="none"
          stroke="#707070"
          strokeWidth="2"
        />
      </svg>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default CustomCheckbox;
