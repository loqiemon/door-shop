import React from 'react';
import styled from 'styled-components';
import { Pagination as MUIPagination } from '@mui/material';
import Stack from '@mui/material/Stack';

export function Pagination({
  page,
  goToPage,
  totalCount,
  pageSize = 10
}) {
  const handleChange = (event, pageNumber) => {
    goToPage(pageNumber)
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