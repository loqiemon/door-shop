
import React, { useState } from 'react'
import styled from 'styled-components'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import Loader from '../../components/Loader';
import { useSearch, useInput, usePagination } from '../../shared/hooks';
import Modal from '../modal/Modal';
import СharacteristicsTypeForm from './СharacteristicsTypeForm';
import {
  useDeleteCharacteristicsTypeMutation,
  useGetCharacteristicsTypesQuery,
  usePostCharacteristicsTypeMutation,
  usePutCharacteristicsTypeMutation
} from './characteristicsTypeApi';

function СharacteristicsType() {
  const { featuresTypes, isLoading, isFetching } = useGetCharacteristicsTypesQuery()
  const [isOpen, setIsOpen] = useState(false);
  const [editInput, setEditInput] = useState({});
  const { value: search, onChange: setSearch } = useInput('')
  const { searchedArray } = useSearch(featuresTypes, search, 'name')
  const [edit, setEdit] = useState(false);

  const {
    paginatedData,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage
  } = usePagination({ array: searchedArray });


  const handleEdit = (featuresType) => {
    setEdit(true);
    setIsOpen(true);
    setEditInput(featuresType)
  }

  const handleDelete = (id) => {
    setEdit(false);
    useDeleteCharacteristicsTypeMutation(id)
  }

  const acceptEdit = (featuresType) => {
    usePutCharacteristicsTypeMutation(featuresType)
  }


  return (
    <>
      {(isLoading || isFetching) && <LoaderDiv><Loader /></LoaderDiv>}
      {!isLoading && !isFetching &&
        <TableContainer1>
          <div style={{ display: 'flex', gap: '15px' }}>
            {children}
            <Input
              placeholder='Поиск...'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <TableContainer2 component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCellHeader align="left">Название</TableCellHeader>
                  <TableCellHeader align="left">Влияет на цену?</TableCellHeader>
                  <TableCellHeader align="left">Действия</TableCellHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.price ? 'Да' : 'Нет'}</TableCell>
                    <TableCell>
                      <EditButton onClick={() => handleEdit(row)}><i className="fa-regular fa-pen-to-square"></i></EditButton>
                      <DeleteButton onClick={() => handleDelete(row.id)}><i className="fa-solid fa-trash-can"></i></DeleteButton>
                    </TableCell>
                  </TableRow>
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
            style={{ overflowY: 'hidden' }}
          />
          {isOpen &&
            <Modal
              children={
                edit ?
                  <СharacteristicsTypeForm
                    handleSend={acceptEdit}
                    defaulValues={editInput}
                  /> :
                  <СharacteristicsTypeForm
                    handleSend={usePostCharacteristicsTypeMutation}
                  />
              }
              onClose={() => setIsOpen(false)}
            >
            </Modal>
          }
        </TableContainer1>
      }
    </>
  )
}

export default СharacteristicsType

const LoaderDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TableContainer1 = styled.div`
  width: 100%;
  /* max-height: 500px; */
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


const Input = styled.input`
    background-color: #f7f7f7;
    padding: 12px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const TableContainer2 = styled(TableContainer)`
    height: 500px;
`


