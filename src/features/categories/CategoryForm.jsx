import React, { useState } from 'react'
import styled from 'styled-components'
import useInput from '../../shared/hooks/useInput'
import { useDispatch } from 'react-redux'
import { addCategory } from '../../app/actionCreators'
import { convertImageToBase64 } from '../../utils/convertImage'


function CategoryForm() {
  const val = useInput()
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const imageBase64 = await convertImageToBase64(file);
    setSelectedImage(imageBase64);
  };

  const handleSubmit = () => {
    if (selectedImage.length !== 0 && val.value) {
      dispatch(addCategory({ type: val.value, image: selectedImage }))
      val.onChange('');
      setSelectedImage('');
    }
  }

  return (
    <Container>
      <Title>Добавление категории</Title>
      <Form>
        <Input
          placeholder='Название категории...'
          value={val.value}
          onChange={e => val.onChange(e.target.value)}
        />
        <Input
          placeholder='Фото'
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <Button onClick={handleSubmit}>Добавить</Button>
      </Form>
    </Container>
  )
}

export default CategoryForm


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: left;
`

const Form = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;

    @media (max-width: 767px) {
      flex-direction: column;
      gap: 10px;
    }
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
