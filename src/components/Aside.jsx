import React, {
    useEffect,
} from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { useDispatch, useSelector } from 'react-redux';
import { fetchFilters } from '../app/actionCreators';


function Aside({search, setSearch, filters, setFilters, requestProducts}) {
  const {countrys, manufacturers, isLoading } = useSelector(state => state.filters)
  const dispatch = useDispatch();

  useEffect(() => {
    if (countrys.length === 0) {
      dispatch(fetchFilters())
    }
  }, []);


  return (
    <AsideList>
        <AsideItem>
            <Search 
                placeholder='Поиск'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </AsideItem>
        <AsideItem>
            <Input
                value={filters.minPrice}
                onChange={e => setFilters(prev => ({...prev, minPrice: e.target.value}))}
                id="outlined-basic"
                label="Цена от"
            />
            <Input
                value={filters.maxPrice}
                onChange={e => setFilters(prev => ({...prev, maxPrice: e.target.value}))}
                id="outlined-basic"
                label="До"
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Страна</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={filters.country}
                onChange={e => setFilters((prev) => ({...prev, country: e.target.value}))}
                label="Type"
              >
              <MenuItem value="">
                  <em>None</em>
              </MenuItem>
              {countrys.map(country => 
                  <MenuItem 
                      value={country}
                      key={country}
                  >
                      {country}
                  </MenuItem>
              )}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Производитель</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={filters.manufacturer}
                onChange={e => setFilters((prev) => ({...prev, manufacturer: e.target.value}))}
                label="Type"
              >
              <MenuItem value="">
                  <em>None</em>
              </MenuItem>
              {manufacturers.map(manufacturer => 
                  <MenuItem 
                      value={manufacturer}
                      key={manufacturer}
                  >
                      {manufacturer}
                  </MenuItem>
              )}
              </Select>
            </FormControl>
        </AsideItem>
        <AsideButton onClick={requestProducts}>Применить</AsideButton>
    </AsideList>
  )
}

export default Aside


const AsideList = styled.aside`
  width: 20%;
  min-width: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap:15px;
`

const AsideItem = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    background-color: #fff;
    gap: 8px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const Search =styled.input`
  width: 100%;
  padding: 5px;
  
`

const Category =styled.span`
  width: 100%;
  font-size: 18px;
  cursor: pointer;
  transition: all .3s ease-in;

  &:hover {
    background-color: #f7f7f7;
    transform: scale(1.1);
    font-weight: 700;
    color: #5065f6;
  }

  &.active {
    background-color: #f7f7f7;
    font-weight: 700;
    color: #5065f6;
  }
`

const AsideButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 15px;
    font-weight: 500;
    font-size: 20px;
    transition: all .3s ease-in;
    font-weight: 600;
    &:hover {
        /* background-color: #5065f6; */
        background-color: #FFD700;
        color: #000;
    }
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

`


const Input = styled(TextField)`
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-radius: 15px; 
    border-color: #56195d;
    /* border-color: #FFD700; */
  }

  & .MuiInputLabel-root.Mui-focused {
    color: #56195d; 
    /* color: #FFD700; */
  }

  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-radius: 15px;
  }

  background-color: #f7f7f7;
  padding: 12px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
