import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-material-ui-carousel'


import useSearch from '../../hooks/useSearch';
import useInput from '../../hooks/useInput';
import Modal from '../modal/Modal';
import Loader from '../../components/Loader'
import { deleteProduct, editProduct, fetchProducts, fetchCategories } from '../../app/actionCreators';

const columns = [
  { id: 'name', label: 'Название', minWidth: 120 },
  { id: 'manufacturer', label: 'Бренд', minWidth: 100 },
  { id: 'country', label: 'Страна', minWidth: 70 },
  { id: 'description', label: 'Описание', minWidth: 230 },
  { id: 'isAvaible', label: 'Доступность', minWidth: 100 },
  { id: 'vendorCode', label: 'Артикул', minWidth: 100 },
  { id: 'retailPrice', label: 'Розничная цена', minWidth: 70 },
  { id: 'wholesalePrice', label: 'Оптовая цена', minWidth: 70 },
  { id: 'image', label: 'Картинка', minWidth: 150 },
  { id: 'accessoryTypeId', label: 'Тип', minWidth: 100 },
  { id: 'actions', label: 'Действия', minWidth: 90 },
];


export default function ProductList3() {
    const { products, isLoading, getProductsError, addProductsError } = useSelector(state => state.products);
    const { categories } = useSelector(state => state.categories);
    const { value: search, onChange: setSearch} = useInput();
    const [searchProp, setSearchProp] = useState('name');
    const { searchedArray } = useSearch(products, search, searchProp);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
    }, [])

  return (
    <>
        {isLoading && <MyLoader><Loader/></MyLoader>}
        {!isLoading && <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {products.map((row) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === 'image') {
                            return (
                              <TableCell key={column.id}>
                                <Carousel>
                                    {value.split(' ').map(imagePath => 
                                        <TableImage src={`${imagePath}`} alt="" key={imagePath}/>  
                                    )}
                                </Carousel>
                              </TableCell>
                            );
                          } else if (column.id === 'description') {
                            return (
                                <TableCellDesc key={column.id}>
                                  {value}
                                </TableCellDesc>
                              );
                          } else {
                            return (
                              <TableCell key={column.id}>
                                {value}
                              </TableCell>
                            );
                          }
                        })}
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        </Paper>
        }
    </>
  );
}


const MyLoader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const TableImage = styled.img`
  max-width: 100px;
  max-height: 100px;
`

const TableCellDesc = styled(TableCell)`
    height: 100px;
    overflow-y: hidden;
    text-overflow: ellipsis;
`