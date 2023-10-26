import React from 'react'
import styled from 'styled-components'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Pagination from '../../components/Pagination';
function OrderFillters({
    filters,
    setFilters,
    goToPage,
    page
}) {
  return (
    <Container>
        <Input 
            placeholder='Поиск...'
            value={filters.search}
            onChange={e => setFilters(prev => ({...prev, search: e.target.value}))}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Поле поиска</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={filters.searchParameter}
                onChange={e => setFilters(prev => ({...prev, searchParameter: e.target.value}))}
                label="Type"
              >
                <MenuItem value='name'>Имя</MenuItem>
                <MenuItem value='commentary'>Комментарий</MenuItem>
                <MenuItem value='status'>Статус</MenuItem>
                <MenuItem value='phonenumber'>Телефон</MenuItem>
                <MenuItem value='mail'>Почта</MenuItem>
              </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="sortType">Тип сортировки</InputLabel>
            <Select
                labelId="sortType"
                value={filters.sortType}
                onChange={e => setFilters(prev => ({...prev, sortType: e.target.value}))}
            >
                <MenuItem value='asc'><KeyboardArrowUpIcon/></MenuItem>
                <MenuItem value='desc'><KeyboardArrowDownIcon/></MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="filters.sortBy">Сортировать по</InputLabel>
              <Select
                labelId="filters.sortBy"
                value={filters.sortBy}
                onChange={e => setFilters(prev => ({...prev, sortBy: e.target.value}))}
              >
                <MenuItem value='date'>Дате</MenuItem>
                <MenuItem value='sum'>Сумме</MenuItem>
              </Select>
          </FormControl>
          <Button onClick={() => goToPage(page)}>Применить</Button>
    </Container>
  )
}

export default OrderFillters


const Input = styled.input`
    background-color: #f7f7f7;
    padding: 12px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const Container = styled.div`
    width: 100%;
    display: flex;
    padding: 10px;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    
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