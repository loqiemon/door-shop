import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';


import useInput from '../../hooks/useInput'
import { fetchCategories } from '../../app/actionCreators';
import { convertImageToBase64 } from '../../utils/convertImage';
import AlertJsx from '../../components/Alert'


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


function ProductsForm({handleSubmit, inputValues = {
  id: '',
  name: '',
  manufacturer: '',
  country: '',
  weight: '',
  description: '',
  retailPrice: '',
  wholesalePrice: '',
  isAvaible: '',
  image: [],
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
  const isAvaibleInput = useInput();
  const [selectedImage, setSelectedImage] = useState([]);
  const [accessoryTypeId , setAccessoryTypeId ] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const alertState = useSelector(state => state.products.alert)

  const showAlert = () => {
    setIsAlertVisible(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 5000);
  };

  useEffect(() => {
    if (alertState === 'Ошибка') {
      showAlert()
    } else if (alertState === 'Успешно добавлен') {
      showAlert()
    }
  }, [alertState]);


  const handleImageChange = async (event) => {
    const files = event.target.files;
    const imageBase64Array = await Promise.all(Array.from(files).map(convertImageToBase64));
    setSelectedImage([...selectedImage, ...imageBase64Array]);
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
    isAvaibleInput.onChange(inputValues.isAvaible);
    wholesalePriceInput.onChange(inputValues.wholesalePrice);
    vendorCodeInput.onChange(inputValues.vendorCode);
    setSelectedImage(inputValues.image)
    setAccessoryTypeId(inputValues.accessoryType)
  }, []);

  const categories = useSelector(state => state.categories.categories);

  const handleChange = (event) => {
    event.stopPropagation();
    setAccessoryTypeId(event.target.value);
  };


  const handleRemoveImage = (index) => {
    const newImages = [...selectedImage];
    newImages.splice(index, 1);
    setSelectedImage(newImages);
    setCurrentImageIndex(0);
  };
  

  const handleClick = () => {
    const retailPrice = parseFloat(retailPriceInput.value);
    const wholesalePrice = parseFloat(wholesalePriceInput.value);


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
      isAvaible: isAvaibleInput.value,
      image: selectedImage
  };
    console.log(productData);
    console.log(descriptionInput)
    if (
        !nameInput.value ||
        !manufacturerInput.value ||
        !countryInput.value ||
        // !isAvaibleInput.value ||
        // !weightInput.value ||
        // !descriptionInput.value ||
        isNaN(retailPrice) ||
        isNaN(wholesalePrice) ||
        !accessoryTypeId ||
        !vendorCodeInput.value ||
        !selectedImage.length > 0
    ) {
        alert('Пожалуйста, заполните все поля и выберите значение в селекте');
        return;
    }
    


    // dispatch(addCategory({Type: val.value}))
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
        <div>
          {selectedImage.map((image, index) => (
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
          type={alertState === 'Успешно добавлен' ? 'success' : 'error'} />
        }
    </Container>
  )
}

export default ProductsForm
