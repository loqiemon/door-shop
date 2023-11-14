import React, { useEffect } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


import { useDispatch, useSelector } from 'react-redux';
import { fetchFilters } from '../app/actionCreators';
import {
  Button,
  CustomSelect,
  CustomInput
} from '../shared/ui';


function valuetext(value) {
  return `${value} руб`;
}

const marks = [
  { value: 0, label: '0 руб' },
  { value: 200, label: '200т.р.' },
];


function Aside({
  categoryId,
  filters,
  setFilters,
  requestProducts,
  classes
}) {
  const [value, setValue] = React.useState([0, 200]);

  const { countrys, manufacturers, colors } = useSelector(state => state.filters)
  const dispatch = useDispatch();

  useEffect(() => {
    // if (countrys.length === 0) {
    dispatch(fetchFilters(categoryId))
    // }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilters(prev => ({
      ...prev,
      minPrice: newValue[0] * 1000,
      maxPrice: newValue[1] * 1000
    }))
  };


  return (
    <List className={classes}>
      <ListItem>
        <Search
          placeholder='Поиск'
          value={filters.search}
          onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
        />
      </ListItem>
      <ListItem>
        <CustomInput
          value={filters.minPrice}
          onChange={e => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
          id="outlined-basic"
          label="Цена от"
        />
        <CustomInput
          value={filters.maxPrice}
          onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
          id="outlined-basic"
          label="До"
        />
        <MyBox >
          <Slider
            getAriaLabel={() => 'Диапазон цен'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            max={200}
            marks={marks}
          />
        </MyBox>
        <CustomSelect
          label={'Страна'}
          value={filters.country}
          onChange={e => setFilters(prev => ({ ...prev, country: e.target.value }))}
          options={countrys && countrys.map(country => {
            return {
              value: country,
              text: country
            }
          })}
        />
        <CustomSelect
          label={'Производитель'}
          value={filters.manufacturer}
          onChange={e => setFilters(prev => ({ ...prev, manufacturer: e.target.value }))}
          options={manufacturers && manufacturers.map(manufacturer => {
            return {
              value: manufacturer,
              text: manufacturer
            }
          })}
        />
        <CustomSelect
          label={'Цвет'}
          value={filters.colors}
          onChange={e => setFilters(prev => ({ ...prev, colors: e.target.value }))}
          options={colors && colors.map(color => {
            return {
              value: color,
              text: color
            }
          })}
        />
        <CustomSelect
          label={'Сортировка'}
          value={filters.sortType}
          onChange={e => setFilters(prev => ({ ...prev, sortType: e.target.value }))}
          options={[
            { value: 'asc', text: 'По возрастанию' },
            { value: 'desc', text: 'По убыванию' }
          ]}
        />
      </ListItem>
      <Button text='Применить' onClick={requestProducts} />
    </List>
  )
}

export default Aside

const MyBox = styled(Box)`
  margin: 0 auto;
  width: 90%;
`

const List = styled.div`
  width: 270px;
  width: 20%;
  min-width: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap:15px;

  @media (max-width: 991px) {
    width: 100%; 
    min-width: unset;
  }

  &.hidden {
    @media (max-width: 991px) {
      display: none;
    } 
  }
`

const ListItem = styled.div`
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    background-color: #fff;
    gap: 8px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const Search = styled.input`
  width: 100%;
  padding: 5px;
`

