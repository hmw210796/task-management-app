import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  z-index: 1000;
  justify-content: center;
  animation: ${({ show }) => (show ? fadeIn : fadeOut)} 0.3s forwards;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  max-width: 296px;
  max-height: 193px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  animation: ${({ show }) => (show ? fadeIn : fadeOut)} 0.3s forwards;
  top: 5.2rem;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 296px;
    max-height: 193px;
    transform: translateY(-50%);
    top: 50%;
  }
`;

const Modal = ({ show, onClose, children }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      // Wait for fadeOut animation before unmounting
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <Overlay show={show} onClick={onClose}>
      <ModalBox show={show} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalBox>
    </Overlay>
  );
};

export default Modal;
