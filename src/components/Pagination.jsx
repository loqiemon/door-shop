import React from 'react';
import styled from 'styled-components';
import { Pagination as MUIPagination } from '@mui/material';
import Stack from '@mui/material/Stack';

function Pagination({ 
  page,
  goToPage,
  totalCount,
  pageSize = 10
}) {
  const handleChange = (event, value) => {
    goToPage(value)
  };

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <DivFlex>
      <Stack spacing={2}>
        <MUIPagination 
          count={totalPages}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          page={parseInt(page)}
          onChange={handleChange}
        />
      </Stack>
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

const PageNumber = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
`;
