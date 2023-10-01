import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styled from 'styled-components';


function Pagination({ totalItems, page, goToPage }) {

  const nextPage = () => {
    if (totalItems.length !== 0) {
      goToPage(Number(page) + 1)
    }
  };

  const prevPage = () => {
    if (page > 1) {
      goToPage(Number(page) - 1)
    }
  };


  return (
    <DivFlex>
      <DivMy onClick={prevPage} disabled={page === 1}> 
        <KeyboardArrowLeftIcon/>
      </DivMy>
      <DivMy onClick={nextPage} disabled={totalItems.length === 0 || totalItems.length < 10}>
        <KeyboardArrowRightIcon/>
      </DivMy>
    </DivFlex>
  );
}

export default Pagination;

const DivFlex = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 10px;
`

const DivMy = styled.button`
  padding: 6px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .35s ease-in;
  &:hover {
    background-color: #FFD700;
  }
`
