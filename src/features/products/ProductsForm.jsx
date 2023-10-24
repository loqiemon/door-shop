import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { v4 as uuidv4 } from 'uuid';

import useInput from '../../hooks/useInput'
import { fetchCategories } from '../../app/actionCreators';
import { convertImageToBase64 } from '../../utils/convertImage';
import AlertJsx from '../../components/Alert'
import isOurPhoto from '../../utils/isOurPhoto'
import { API_URL } from '../../services/constants';


function ProductsForm({
  handleSubmit,
  inputValues,
  btnText = 'Добавить',
  title = 'Добавление товара' 
}) {
  const nameInput = useInput(inputValues.name);
  const vendorCodeInput = useInput(inputValues.vendorCode);
  const manufacturerInput = useInput(inputValues.manufacturer);
  const countryInput = useInput(inputValues.country);
  const weightInput = useInput(inputValues.weight);
  const descriptionInput = useInput(inputValues.description);
  const retailPriceInput = useInput(inputValues.retailPrice);
  const wholesalePriceInput = useInput(inputValues.wholesalePrice);
  const isAvaibleInput = useInput(inputValues.isAvaible);
  const [selectedImage, setSelectedImage] = useState(inputValues.image || []);
  const [accessoryTypeId , setAccessoryTypeId ] = useState(inputValues.accessoryType);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const [characteristics, setCharacteristics] = useState(inputValues.characteristics || []);
  const featureNameInput = useInput('');
  const [featureNameSelect, setFeatureNameSelect] = useState('');
  const featureValueInput = useInput('');
  const featurePriceModifierInput = useInput('');
  const [characteristicTypes, setCharacteristicTypes] = useState([]);

  const alertState = useSelector(state => state.products.alert)

  const showAlert = () => {
    setIsAlertVisible(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 5000);
  };

  useEffect(() => {
    showAlert()
  }, [alertState]);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
    fetch(`${API_URL}CharacteristicTypes`)
      .then(res => res.json())
      .then(data => setCharacteristicTypes(data))

  }, []);

  const categories = useSelector(state => state.categories.categories);

  const handleChange = (event) => {
    event.stopPropagation();
    setAccessoryTypeId(event.target.value);
  };

  const handleImageChange = async (event) => {
    const files = event.target.files;
    const imageBase64Array = await Promise.all(Array.from(files).map(convertImageToBase64));
    setSelectedImage([...selectedImage, ...imageBase64Array]);
  };
  
  const handleRemoveImage = (index) => {
    const newImages = [...selectedImage];
    newImages.splice(index, 1);
    setSelectedImage(newImages);
    setCurrentImageIndex(0);
  };

  const deleteCharacteristic = (id) => {
    // setCharacteristics(prev => prev.filter(item => item.id !== id))
    setCharacteristics(prev => prev.filter((item, index) => index !== id))
  }

  const addCharacteristic = () => {
    if (
      featureNameSelect.length !== 0 &&
      featureValueInput.value.length !== 0 &&
      featurePriceModifierInput.value.length !== 0 &&
      characteristics.find(item => item.characteristicTypeId === featureNameSelect.id) === undefined
    ) {
      const feature = {
        characteristicTypeId : featureNameSelect.id,
        value: featureValueInput.value.trim(),
        priceModifier: parseFloat(featurePriceModifierInput.value)
      }
      featureNameInput.onChange('');
      featureValueInput.onChange('');
      featurePriceModifierInput.onChange('');
      setFeatureNameSelect('');
      setCharacteristics(prev => [...prev, feature])
    }
  }

  const findCharacteristic = (id) => {
    const a = characteristicTypes.find(item => item.id === id)
    return a
  }
  

  const handleClick = () => {
    const retailPrice = parseFloat(retailPriceInput.value);
    const wholesalePrice = parseFloat(wholesalePriceInput.value);
    const productData = {
      id: inputValues.id,
      name: nameInput.value.trim(),
      manufacturer: manufacturerInput.value.trim(),
      country: countryInput.value.trim(),
      weight: weightInput.value,
      description: descriptionInput.value.trim(),
      retailPrice: parseFloat(retailPriceInput.value),
      wholesalePrice: parseFloat(wholesalePriceInput.value),
      accessoryTypeId: accessoryTypeId,
      vendorCode: vendorCodeInput.value.trim(),
      isAvaible: isAvaibleInput.value.trim(),
      image: selectedImage,
      characteristics: characteristics
    };

    if (
        !nameInput.value ||
        !manufacturerInput.value ||
        !countryInput.value ||
        isNaN(retailPrice) ||
        isNaN(wholesalePrice) ||
        !accessoryTypeId ||
        !vendorCodeInput.value ||
        !selectedImage.length > 0
    ) {
        alert('Пожалуйста, заполните все поля и выберите значение в селекте');
        return;
    }
    
    handleSubmit(productData)
    nameInput.onChange('');
    manufacturerInput.onChange('');
    countryInput.onChange('');
    weightInput.onChange('');
    descriptionInput.onChange('');
    isAvaibleInput.onChange('');
    retailPriceInput.onChange('');
    wholesalePriceInput.onChange('');
    vendorCodeInput.onChange('');
    setCharacteristics([]);
    setSelectedImage([]);
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
        <StyledTextarea
          aria-label="Описание"
          minRows={3}
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
          value={isAvaibleInput.value}
          onChange={e => isAvaibleInput.onChange(e.target.value)}
          label="Доступность"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {categories.length > 0 &&
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Тип товара</InputLabel>
            <Select
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
        }
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={characteristicTypes}
          getOptionLabel={(option) => option.name || ""}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Тип хар-ки" />}
          isOptionEqualToValue={(option, value) => option.name === value || value === ""}
          value={featureNameSelect}
          onChange={(e, newValue) => {setFeatureNameSelect(newValue)}}
          inputValue={featureNameInput.value}
          onInputChange={(e, newInputValue) => featureNameInput.onChange(newInputValue)}
        />
        {/* <Input
          value={featureNameInput.value}
          onChange={e => featureNameInput.onChange(e.target.value)}
          label="Характеристика"
        /> */}
        <Input
          value={featureValueInput.value}
          onChange={e => featureValueInput.onChange(e.target.value)}
          label="Значение"
        />
        <Input
          value={featurePriceModifierInput.value}
          onChange={e => featurePriceModifierInput.onChange(e.target.value)}
          label="Модификатор цены"
        />
        <Button onClick={addCharacteristic}>Добавить характеристику</Button>
        {characteristics.map((characteristic, index) => 
          <div 
            onClick={() => deleteCharacteristic(index)}

            key={index}
          >
            {characteristicTypes.length > 0 && 
            findCharacteristic(characteristic.characteristicTypeId).name}: {characteristic.value} {characteristic.priceModifier}
          </div>
        )}
        <div>
          {selectedImage && isOurPhoto(selectedImage.join(" ")).map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Фото ${index + 1}`} width="100" />
              <button onClick={() => handleRemoveImage(index)}>Удалить</button>
            </div>
          ))}
        </div>
        <Button onClick={handleClick}>{btnText}</Button>
        </Form>
        {isAlertVisible && <AlertJsx 
          message={alertState}
          onClose={() => setIsAlertVisible(false)}
          type={alertState === 'Успешно' ? 'success' : 'error'} />
        }
    </Container>
  )
}

export default ProductsForm


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

const StyledTextarea = styled(TextareaAutosize)`
  background-color: #f7f7f7;
  padding: 12px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  max-width: 100%;

  &:focus {
    background-color: #ffffff; 
    border: 1px solid #56195d; 
    outline: none;
  }
  
`

