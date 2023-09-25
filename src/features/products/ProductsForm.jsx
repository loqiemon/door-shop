import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import useInput from '../../hooks/useInput'
import { fetchCategories } from '../../app/actionCreators';
import { convertImageToBase64 } from '../../utils/convertImage';


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

const ImageInput = styled.input`
    display: none; 
`;


function ProductsForm({handleSubmit, inputValues = {
  id: '',
  name: '',
  manufacturer: '',
  country: '',
  weight: '',
  description: '',
  retailPrice: '',
  wholesalePrice: '',
  image: '',
  vendorCode: '',
  accessoryType: ''
}, btnText = 'Добавить', title = 'Добавление товара' }) {
  const nameInput = useInput();
  const vendorCodeInput = useInput();
  const manufacturerInput = useInput();
  const countryInput = useInput();
  const weightInput = useInput();
  const descriptionInput = useInput();
  const retailPriceInput = useInput();
  const wholesalePriceInput = useInput();
  const [selectedImage, setSelectedImage] = useState('');
  const [accessoryTypeId , setAccessoryTypeId ] = useState('');


  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const imageBase64 = await convertImageToBase64(file);
    setSelectedImage(imageBase64); 
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
    nameInput.onChange(inputValues.name);
    manufacturerInput.onChange(inputValues.manufacturer);
    countryInput.onChange(inputValues.country);
    weightInput.onChange(inputValues.weight);
    descriptionInput.onChange(inputValues.description);
    retailPriceInput.onChange(inputValues.retailPrice);
    wholesalePriceInput.onChange(inputValues.wholesalePrice);
    vendorCodeInput.onChange(inputValues.vendorCode);
    setSelectedImage(inputValues.image)
    setAccessoryTypeId(inputValues.accessoryType)
  }, []);

  const categories = useSelector(state => state.categories.categories);

  const handleChange = (event) => {
    setAccessoryTypeId(event.target.value);
  };


  

  const handleClick = () => {
    const retailPrice = parseFloat(retailPriceInput.value);
    const wholesalePrice = parseFloat(wholesalePriceInput.value);

    if (
        !nameInput.value ||
        !manufacturerInput.value ||
        !countryInput.value ||
        !weightInput.value ||
        !descriptionInput.value ||
        isNaN(retailPrice) ||
        isNaN(wholesalePrice) ||
        !accessoryTypeId ||
        !vendorCodeInput.value ||
        selectedImage.length === 0
    ) {
        alert('Пожалуйста, заполните все поля и выберите значение в селекте');
        return;
    }
    
    const productData = {
        id: inputValues.id,
        name: nameInput.value,
        manufacturer: manufacturerInput.value,
        country: countryInput.value,
        weight: weightInput.value,
        description: descriptionInput.value,
        retailPrice: retailPriceInput.value,
        wholesalePrice: wholesalePriceInput.value,
        accessoryTypeId: accessoryTypeId,
        vendorCode: vendorCodeInput.value,
        image: selectedImage
    };
    console.log(productData);

    // dispatch(addCategory({Type: val.value}))
    handleSubmit(productData)
    nameInput.onChange('');
    manufacturerInput.onChange('');
    countryInput.onChange('');
    weightInput.onChange('');
    descriptionInput.onChange('');
    retailPriceInput.onChange('');
    wholesalePriceInput.onChange('');
    vendorCodeInput.onChange('');
    setSelectedImage('');
    setAccessoryTypeId('');
  }

  return (
    <Container>
        <Title>{title}</Title>
        <Form>
        <Input
          value={nameInput.value}
          onChange={e => nameInput.onChange(e.target.value)}
          id="outlined-basic"
          label="Название"
        />
        <Input
          value={manufacturerInput.value}
          onChange={e => manufacturerInput.onChange(e.target.value)}
          label="Производитель"
        />
        <Input
          value={countryInput.value}
          onChange={e => countryInput.onChange(e.target.value)}
          label="Страна производителя"
        />
        <Input
          value={weightInput.value}
          onChange={e => weightInput.onChange(e.target.value)}
          label="Вес"
        />
        <Input
          value={descriptionInput.value}
          onChange={e => descriptionInput.onChange(e.target.value)}
          label="Описание"
        />
        <Input
          value={retailPriceInput.value}
          onChange={e => retailPriceInput.onChange(e.target.value)}
          label="Розничная цена"
        />
        <Input
          value={wholesalePriceInput.value}
          onChange={e => wholesalePriceInput.onChange(e.target.value)}
          label="Оптовая цена"
        />
        <Input
          value={vendorCodeInput.value}
          onChange={e => vendorCodeInput.onChange(e.target.value)}
          label="Артикул"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Тип</InputLabel>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={accessoryTypeId}
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
        <Button onClick={handleClick}>{btnText}</Button>
        </Form>
    </Container>
  )
}

export default ProductsForm
