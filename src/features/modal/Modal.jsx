import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-height: 900px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
		width: 5px;           
	}
	  
  &::-webkit-scrollbar-track {
    background: rgba(0,0,0,0);      
  }
	  
	&::-webkit-scrollbar-thumb {
		background-color: #555;  
		border-radius: 20px;      
	}
	
	scrollbar-width: thin;
	scrollbar-color: #555 rgba(0,0,0,0);  
`;

const ModalSpan = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  transition: all .3s ease-in;
  transform: scale(1.1);

  &:hover {
    color: red;
    transform: scale(1.2);
  }
`;

const Modal = ({ children, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        {children}
        <ModalSpan onClick={onClose}>&#10006;</ModalSpan>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
