import React from 'react'
import styled from 'styled-components'


function Loader({
  ...props
}) {
  return (
    <Container {...props}>
      <Spinner />
    </Container>
  )
}

export default Loader

const Spinner = styled.div` 
  border: 16px solid #d2cbcb; 
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
