import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCategories } from '../../app/actionCreators';
import { usePostCsvMutation } from './csvApi';
import { API_URL } from '../../services/constants';
import Loader from '../../components/Loader';
import { usePostCharacteristicsTypeMutation } from '../characteristicsType/characteristicsTypeApi';


function CsvForm() {
  const [csv, setCsv] = useState();
  const [accessoryTypeId, setAccessoryTypeId] = useState();
  const [accessoryTypeCharacteristics, setAccessoryTypeCharacteristics] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [])


  const categories = useSelector(state => state.categories.categories);
  const [postCsv, { isLoading, error }] = usePostCsvMutation();
  const [postCharacteristicsType, { isLoading: isLoading2, error: error2 }] = usePostCharacteristicsTypeMutation();

  // useEffect(() => {
  //   if (error !== undefined) {
  //     alert(error?.message);
  //   }
  // }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accessoryTypeId && csv) {
      postCsv({
        file: csv,
        accessoryTypeId
      }).then((response) => {
        console.log(response)
        alert(response.error.data);
      }).catch((error) => {
        alert("Ошибка");
      })
    }
  }

  const handleAddType = (e) => {
    e.preventDefault();
    console.log(accessoryTypeCharacteristics)
    if (accessoryTypeCharacteristics) {
      postCharacteristicsType(accessoryTypeCharacteristics)
        .then((response) => {
          // alert('Успешно')
        })
        .catch((error) => {
          alert("Ошибка");
        })

      setAccessoryTypeCharacteristics('');
    }
  }

  const handleChange = (e) => {
    setAccessoryTypeId(e.target.value);
  }

  return (
    <Container>
      {isLoading && <LoaderDiv><Loader /></LoaderDiv>}
      {!isLoading && (
        <>
          <Input
            placeholder='CSV'
            type='file'
            name="file"
            accept=".csv"
            onChange={(e) => setCsv(e.target.files[0])}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Тип товара</InputLabel>
            <Select
              value={accessoryTypeId || ''}
              onChange={handleChange}
              label="Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map(category =>
                <MenuItem
                  value={category.id}
                  key={category.id}
                >
                  {category.type}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <Button onClick={handleSubmit}>Отправить</Button>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Input
              value={accessoryTypeCharacteristics}
              id="demo-simple-select-standard-label"
              placeholder='Тип характеристики'
              onChange={(e) => setAccessoryTypeCharacteristics(e.target.value)}
            />
          </FormControl>
          <Button onClick={handleAddType}>Добавить</Button>
        </>
      )}
    </Container>
  )
}

export default CsvForm

const Container = styled.div`
  width: 100%;
  padding: 20px 0;
  height: 50vh;
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
    gap: 10px;
  }
`

const LoaderDiv = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
`

const Input = styled(TextField)`
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-radius: 15px; 
    border-color: #56195d;
  }

  & .MuiInputLabel-root.Mui-focused {
    color: #56195d; 
  }

  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-radius: 15px;
  }

    background-color: #f7f7f7;
    padding: 12px;
    border-radius: 15px;
    /* box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 5px; */
`

const Button = styled.button`
    padding: 12px;
    background-color: #f7f7f7;
    border-radius: 15px;
    transition: all .35s ease-in;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    max-height: 60px;
    &:hover {
      background-color: #56195d;
      color: white;
    }
`