import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


import useInput from '../../hooks/useInput'
import { fetchCategories } from '../../app/actionCreators';


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: left;
    padding-bottom: 20px;
`

const Form = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
`

const Title = styled.h2`
    font-size: 25px;
    font-weight: 500;
    color: #000;
`

const Input = styled.input`
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


function ProductsForm({handleSubmit, inputValues = {
  id: '',
  Name: '',
  Manufacturer: '',
  Country: '',
  Weight: '',
  Description: '',
  RetailPrice: '',
  WholesalePrice: '',
  AccessoryType: ''
}, btnText = 'Добавить', title = 'Добавление товара' }) {
  const nameInput = useInput();
  const manufacturerInput = useInput();
  const countryInput = useInput();
  const weightInput = useInput();
  const descriptionInput = useInput();
  const retailPriceInput = useInput();
  const wholesalePriceInput = useInput();
  const [AccessoryTypeId , setAccessoryTypeId ] = useState('');


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
    nameInput.onChange(inputValues.Name);
    manufacturerInput.onChange(inputValues.Manufacturer);
    countryInput.onChange(inputValues.Country);
    weightInput.onChange(inputValues.Weight);
    descriptionInput.onChange(inputValues.Description);
    retailPriceInput.onChange(inputValues.RetailPrice);
    wholesalePriceInput.onChange(inputValues.WholesalePrice);
    setAccessoryTypeId(inputValues.AccessoryType)
  }, []);

  const categories = useSelector(state => state.categories.categories);

  const handleChange = (event) => {
    setAccessoryTypeId(event.target.value);
  };

  console.log(inputValues, 'inputValues')
  

  const handleClick = () => {
    if (
        !nameInput.value ||
        !manufacturerInput.value ||
        !countryInput.value ||
        !weightInput.value ||
        !descriptionInput.value ||
        !retailPriceInput.value ||
        !wholesalePriceInput.value ||
        !AccessoryTypeId
    ) {
        alert('Пожалуйста, заполните все поля и выберите значение в селекте');
        return;
    }
    const productData = {
        id: inputValues.id,
        Name: nameInput.value,
        Manufacturer: manufacturerInput.value,
        Country: countryInput.value,
        Weight: weightInput.value,
        Description: descriptionInput.value,
        RetailPrice: retailPriceInput.value,
        WholesalePrice: wholesalePriceInput.value,
        AccessoryTypeId: AccessoryTypeId,
    };

    // dispatch(addCategory({Type: val.value}))
    handleSubmit(productData)
    nameInput.onChange('');
    manufacturerInput.onChange('');
    countryInput.onChange('');
    weightInput.onChange('');
    descriptionInput.onChange('');
    retailPriceInput.onChange('');
    wholesalePriceInput.onChange('');
    setAccessoryTypeId('')
  }

  return (
    <Container>
        <Title>{title}</Title>
        <Form>
        <Input
          placeholder='Название'
          value={nameInput.value}
          onChange={e => nameInput.onChange(e.target.value)}
        />
        <Input
          placeholder='Производитель'
          value={manufacturerInput.value}
          onChange={e => manufacturerInput.onChange(e.target.value)}
        />
        <Input
          placeholder='Страна производителя'
          value={countryInput.value}
          onChange={e => countryInput.onChange(e.target.value)}
        />
        <Input
          placeholder='Вес'
          value={weightInput.value}
          onChange={e => weightInput.onChange(e.target.value)}
        />
        <Input
          placeholder='Описание'
          value={descriptionInput.value}
          onChange={e => descriptionInput.onChange(e.target.value)}
        />
        <Input
          placeholder='Розничная цена'
          value={retailPriceInput.value}
          onChange={e => retailPriceInput.onChange(e.target.value)}
        />
        <Input
          placeholder='Оптовая цена'
          value={wholesalePriceInput.value}
          onChange={e => wholesalePriceInput.onChange(e.target.value)}
        />

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Тип</InputLabel>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={AccessoryTypeId}
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
                    {category.Type}
                </MenuItem>
            )}
            </Select>
        </FormControl>
        <Button onClick={handleClick}>{btnText}</Button>
        </Form>
    </Container>
  )
}

export default ProductsForm
