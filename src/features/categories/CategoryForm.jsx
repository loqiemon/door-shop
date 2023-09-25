import React from 'react'
import styled from 'styled-components'
import useInput from '../../hooks/useInput'
import { useDispatch } from 'react-redux'
import { addCategory } from '../../app/actionCreators'

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


function CategoryForm() {
  const val = useInput()
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addCategory({type: val.value}))
    val.onChange('')
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
            <Button onClick={handleSubmit}>Добавить</Button>
        </Form>
    </Container>
  )
}

export default CategoryForm
