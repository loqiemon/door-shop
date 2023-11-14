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



import Modal from '../modal/Modal';
import { deleteCategory, editCategory, fetchCategories } from '../../app/actionCreators';
import { convertImageToBase64 } from '../../shared/helpers/convertImageToBase64';
import { CustomInput, Button } from '../../shared/ui';
import { useSearch, useInput, usePagination } from '../../shared/hooks';

function CategoryList({ children }) {
  const { categories, isLoading, getCategoriesError } = useSelector(state => state.categories)
  const [isOpen, setIsOpen] = useState(false);
  const [editInput, setEditInput] = useState({});
  const { value: search, onChange: setSearch } = useInput()
  const { searchedArray } = useSearch(categories, search, 'type')
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const {
    paginatedData,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage
  } = usePagination({ array: searchedArray });


  const handleEdit = (id, type, image) => {
    setEdit(true);
    setIsOpen(true);
    setEditInput({ id, type, image })
  }

  const handleDelete = (id) => {
    setEdit(false);
    dispatch(deleteCategory(id))
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const imageBase64 = await convertImageToBase64(file);
    setEditInput(prev => ({ ...prev, image: imageBase64 }));
  };

  return (
    <TableContainer1 style={{ height: (isLoading) ? '50vh' : 'auto' }}>
      <div style={{ display: 'flex', gap: '15px' }}>
        {children}
        <CustomInput
          placeholder='Поиск...'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCellHeader align="left">Фото</TableCellHeader>
              <TableCellHeader align="left">Названия</TableCellHeader>
              <TableCellHeader align="left">Действия</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell><TableImage src={row.image} /></TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <EditButton onClick={() => handleEdit(row.id, row.type, row.image)}><i className="fa-regular fa-pen-to-square"></i></EditButton>
                  <DeleteButton onClick={() => handleDelete(row.id)}><i className="fa-solid fa-trash-can"></i></DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={searchedArray.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ overflowY: 'hidden' }}
      />
      {isOpen &&
        <Modal
          children={
            <ModalContainer>
              <CustomInput
                value={editInput.type}
                onChange={e => setEditInput(prev => ({ ...prev, type: e.target.value }))}
              />
              <CustomInput
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Button onClick={() => dispatch(editCategory(editInput))}>Сохранить</Button>
            </ModalContainer>
          }
          onClose={() => setIsOpen(false)}
        >

        </Modal>
      }
    </TableContainer1>
  );
}

export default CategoryList;



const TableContainer1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-top: 20px;
  padding-bottom: 10px; 
`;

const ModalContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`

const EditButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 5px 10px;
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
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;


const TableCellHeader = styled(TableCell)`
  cursor: pointer;
  transition: all .3s ease-in;
  text-align: center;
`


const TableImage = styled.img`
  max-width: 100px;
  max-height: 100px;
`
