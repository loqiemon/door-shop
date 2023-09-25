import React, {
    useEffect,
    useState
} from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';

import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../app/actionCreators';


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
    &:hover {
        background-color: #5065f6;
        font-weight: 700;
        color: #fff;
    }
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

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


function Aside({search, setSearch, filters, setFilters}) {



  const handleClick = () => {
    console.log('clicked');
  }


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
            {/* {categories.map(category => 
                <Category
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={category.id == selectedCategory ? 'active' : ''}
                >
                    {category.Type}  
                </Category>
            )} */}
        </AsideItem>
        <AsideButton
            onClick={handleClick}
        >
            Применить
        </AsideButton>
    </AsideList>
  )
}

export default Aside
