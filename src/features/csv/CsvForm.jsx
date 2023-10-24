import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';  
import { useSelector, useDispatch } from 'react-redux';

import { fetchCategories } from '../../app/actionCreators';
import { usePostCsvMutation } from './csvApi';
import { API_URL } from '../../services/constants';

function CsvForm() {
  const [csv, setCsv] = useState();
  const [accessoryTypeId, setAccessoryTypeId] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [])

  useEffect(() => {
    console.log(csv)
  }, [csv]);

  const categories = useSelector(state => state.categories.categories);
  const [ postCsv ] = usePostCsvMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accessoryTypeId && csv) {
      postCsv({
        file: csv,
        accessoryTypeId
      });
    }
  }

  const handleChange = (e) => {
    setAccessoryTypeId(e.target.value);
  }

  return (
    <Container>
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
    </Container>
  )
}

export default CsvForm

const Container = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;

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
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const Button = styled.button`
    padding: 12px;
    background-color: #f7f7f7;
    border-radius: 15px;
    transition: all .35s ease-in;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    &:hover {
      background-color: #56195d;
      color: white;
    }
`