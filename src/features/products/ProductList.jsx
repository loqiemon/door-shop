import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import useSearch from '../../hooks/useSearch';
import useInput from '../../hooks/useInput';
import usePagination from '../../hooks/usePagination';
import Modal from '../modal/Modal';
import { deleteProduct, editProduct, fetchProducts, fetchCategories } from '../../app/actionCreators';




const TableContainer1 = styled.div`
  width: 100%;
  /* max-height: 350px; */
  max-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-top: 20px;
  padding-bottom: 10px; 
`;


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
    height: 500px;
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
`

function ProductList({handleEdit, handleDelete, children}) {
  const { products, isLoading, getProductsError } = useSelector(state => state.products);
  const { categories } = useSelector(state => state.categories);
  const { value: search, onChange: setSearch} = useInput();
  const [searchProp, setSearchProp] = useState('name');
  const { searchedArray } = useSearch(products, search, searchProp);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [])

  const { 
    paginatedData,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage
  } = usePagination({ array: searchedArray });

  return (
    <TableContainer1>
      <Container>
        <div style={{display: 'flex', gap: '15px'}}>
          {children}
          <Input 
            placeholder='Поиск...'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Поле сортировки</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={searchProp}
                onChange={e => setSearchProp(e.target.value)}
                label="Type"
              >
              <MenuItem value='name'>Имя</MenuItem>
              <MenuItem value='vendorCode'>Артикул</MenuItem>
              <MenuItem value='manufacturer'>Производитель</MenuItem>
              <MenuItem value='country'>Страна</MenuItem>
              <MenuItem value='isAvaible'>Доступность</MenuItem>
              </Select>
          </FormControl>
      </Container>
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
              {paginatedData.map((row, rowIndex) => (
                <TableRowMy
                  key={rowIndex}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCellMy>{row.name}</TableCellMy>
                    <TableCellMy>{row.manufacturer}</TableCellMy>
                    <TableCellMy>{row.country}</TableCellMy>
                    {/* <TableCellMy>{row.weight}</TableCellMy> */}
                    <TableCellMy>{row.description}</TableCellMy>
                    <TableCellMy>{row.isAvaible}</TableCellMy>
                    <TableCellMy>{row.vendorCode} </TableCellMy>
                    <TableCellMy>{row.retailPrice} руб</TableCellMy>
                    <TableCellMy>{row.wholesalePrice} руб</TableCellMy>
                    <TableCellMy><TableImage src={`${row.image}`} alt="" /></TableCellMy>
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
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={searchedArray.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{overflowY: 'hidden'}}
      />
      {/* {isOpen &&     
        <Modal
            children={edit === true ? 
                <>
                    <Input value={editInput.Type} onChange={e => setEditInput(prev => ({...prev, Type: e.target.value}))}/>
                    <Button onClick={() => dispatch(editCategory(editInput))}>Сохранить</Button>
                </>

                : 
                <Button onClick={() => dispatch(deleteCategory(editInput.id))} >Удалить?</Button>}
            onClose={() => setIsOpen(false)}
        >

        </Modal> */}
      
    </TableContainer1>
  );
}

export default ProductList;
