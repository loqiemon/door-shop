import React, { useState } from 'react'
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Carousel from 'react-material-ui-carousel'

import Loader from '../../components/Loader';

import { useGetProductsQuery } from './productApi';
import { isOurPhoto } from '../../shared/helpers';
import { Pagination } from '../../shared/ui';

function ProductList({ handleEdit, handleDelete, children }) {
  const [filters, setFilters] = useState({
    searchByName: '',
    searchParameter: '',
    pageNumber: 1,
  });
  const [acceptFilters, setAcceptFilters] = useState({});
  const [page, setPage] = useState(1);

  const { data: accessories, isLoading, isFetching } = useGetProductsQuery(acceptFilters)
  const products = accessories?.accessories || [];
  const count = accessories?.totalCount || 0;

  const goToPage = (pageNumber) => {
    let pageNumberToSet = 1;

    if (filters.searchByName === acceptFilters.searchByName &&
      filters.searchParameter === acceptFilters.searchParameter
    ) {
      setPage(pageNumber)
      pageNumberToSet = pageNumber
    } else {
      setPage(1)
      pageNumberToSet = 1
    }
    setAcceptFilters(prev => ({
      ...prev,
      ...filters,
      pageNumber: pageNumberToSet,
    }))
  };

  return (
    <TableContainer1 style={{ height: (isFetching || isLoading) ? '50vh' : 'auto' }}>
      <Container>
        <Container2>
          {children}
          <Input
            placeholder='Поиск...'
            value={filters.searchByName}
            onChange={e => setFilters(prev => ({ ...prev, searchByName: e.target.value }))}
          />
        </Container2>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Поле поиска</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={filters.searchParameter}
            onChange={e => setFilters(prev => ({ ...prev, searchParameter: e.target.value }))}
            label="Type"
          >
            <MenuItem value='name'>Имя</MenuItem>
            <MenuItem value='vendorCode'>Артикул</MenuItem>
            <MenuItem value='manufacturer'>Производитель</MenuItem>
            <MenuItem value='country'>Страна</MenuItem>
            <MenuItem value='isAvaible'>Доступность</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={() => goToPage(page)}>Применить</Button>
      </Container>
      {(isLoading || isFetching) && <LoaderDiv><Loader /></LoaderDiv>}
      {!isLoading && !isFetching &&
        <>
          <TableContainer2 component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRowMy>
                  <TableCellHeader align="left">Название</TableCellHeader>
                  <TableCellHeader align="left">Производитель</TableCellHeader>
                  <TableCellHeader align="left">Страна</TableCellHeader>
                  {/* <TableCellHeader align="left">Вес</TableCellHeader> */}
                  <TableCellHeader align="left">Описание</TableCellHeader>
                  <TableCellHeader align="left">Доступность</TableCellHeader>
                  <TableCellHeader align="left">Артикул</TableCellHeader>
                  <TableCellHeader align="left">Розничная цена</TableCellHeader>
                  <TableCellHeader align="left">Оптовая цена</TableCellHeader>
                  <TableCellHeader align="left">Картинка</TableCellHeader>
                  {/* <TableCellHeader align="left">Тип</TableCellHeader> */}
                  <TableCellHeader align="left">Действия</TableCellHeader>
                </TableRowMy>
              </TableHead>
              <TableBody>
                {products.map((row, rowIndex) => (
                  <TableRowMy
                    key={rowIndex}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCellMy>{row.name}</TableCellMy>
                    <TableCellMy>{row.manufacturer}</TableCellMy>
                    <TableCellMy>{row.country}</TableCellMy>
                    {/* <TableCellMy>{row.weight}</TableCellMy> */}
                    <TableCellMy>
                      <Description>
                        {row.description}
                      </Description>
                    </TableCellMy>
                    <TableCellMy>{row.isAvaible}</TableCellMy>
                    <TableCellMy>{row.vendorCode} </TableCellMy>
                    <TableCellMy>{row.retailPrice} руб</TableCellMy>
                    <TableCellMy>{row.wholesalePrice} руб</TableCellMy>
                    <TableCellMy>
                      <Carousel>
                        {isOurPhoto(row.image).map(imagePath =>
                          <TableImage src={`${imagePath}`} alt="" key={imagePath} />
                        )}
                      </Carousel>
                    </TableCellMy>
                    {/* <TableCellMy>{categories.filter(item => item.id === row.AccessoryTypeId)[0].Type}</TableCellMy> */}
                    <TableCellMy>
                      <EditButton onClick={() => handleEdit(row)}><i className="fa-regular fa-pen-to-square"></i></EditButton>
                      <DeleteButton onClick={() => handleDelete(row.id)}><i className="fa-solid fa-trash-can"></i></DeleteButton>
                    </TableCellMy>
                  </TableRowMy>
                ))}
              </TableBody>
            </Table>
          </TableContainer2>
          <Pagination
            page={page}
            goToPage={goToPage}
            totalCount={count}
          />
        </>
      }
    </TableContainer1>
  );
}

export default ProductList;


const Container2 = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`

const TableContainer1 = styled.div`
  width: 100%;
  /* max-height: 350px; */
  /* max-height: 500px; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-top: 20px;
  padding-bottom: 10px; 
`;

const LoaderDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Description = styled.div`
  height: 50px;
  overflow: auto;
`


const EditButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 5px 5px;
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 5px 5px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const TableCellMy = styled(TableCell)`
  height: 50px; 
  overflow: auto;
  text-overflow: ellipsis; 
`

const TableRowMy = styled(TableRow)`
  height: 50px;
  overflow: auto;
  text-overflow: ellipsis; 
`

const TableCellHeader = styled(TableCell)`
  cursor: pointer;
  transition: all .3s ease-in;
  text-align: center;

  /* &:hover {
    transform: scale(1.02);
    background-color: #0064fa;
    color: #fff;
  } */
`


const Input = styled.input`
  background-color: #f7f7f7;
  padding: 12px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const TableContainer2 = styled(TableContainer)`
  /* height: 500px; */
`

const Button = styled.button`
    padding: 12px;
    background-color: #f7f7f7;
    border-radius: 15px;
    transition: all .35s ease-in;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-left: 15px;
    &:hover {
      background-color: #56195d;
      color: white;
    }
`

const TableImage = styled.img`
  max-width: 100px;
  max-height: 100px;
`

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`
