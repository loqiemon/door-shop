import React from 'react'
import styled from 'styled-components'

import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { CustomInput, CustomSelect, Button } from '../../shared/ui';


function OrderFillters({
  filters,
  setFilters,
  goToPage,
  page
}) {
  return (
    <Container>
      <CustomInput
        placeholder='Поиск...'
        value={filters.search}
        onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
      />
      <CustomSelect
        label={'Поле поиска'}
        value={filters.searchParameter}
        onChange={e => setFilters(prev => ({ ...prev, searchParameter: e.target.value }))}
        options={[
          { value: 'name', text: 'Имя' },
          { value: 'commentary', text: 'Комментарий' },
          { value: 'status', text: 'Статус' },
          { value: 'phonenumber', text: 'Телефон' },
          { value: 'mail', text: 'Почта' },
        ]}
      />
      <CustomSelect
        label={'Тип сортировки'}
        value={filters.sortType}
        onChange={e => setFilters(prev => ({ ...prev, sortType: e.target.value }))}
      >
        <MenuItem value='asc'><KeyboardArrowUpIcon /></MenuItem>
        <MenuItem value='desc'><KeyboardArrowDownIcon /></MenuItem>
      </CustomSelect>
      <CustomSelect
        label={'Сортировать по'}
        value={filters.sortBy}
        onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
        options={[
          { value: 'date', text: 'Дате' },
          { value: 'sum', text: 'Сумме' },
        ]}
      />
      <Button
        onClick={() => goToPage(page)}
        text={'Применить'}
        style={{
          width: '150px',
        }}
      />
    </Container>
  )
}

export default OrderFillters



const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
`
