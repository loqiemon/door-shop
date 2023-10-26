import React, { useState } from 'react'
import styled from 'styled-components'
import useInput from '../../hooks/useInput'
import { useGetOrderByTelephoneQuery } from './orderApi';


function GetOrder() {
  const phone = useInput('');
  const [skip, setSkip] = useState(true);

  const { 
    data,
    error,
    isLoading 
  } = useGetOrderByTelephoneQuery(phone.value, {
      skip: skip
  });

  const handleSubmit = () => {
    const pattern = /^[0-9]{11}$/;
    if (!pattern.test(phone.value)) {
      alert("Номер должен быть в формате 89005553535");
      return;
    }
    setSkip(false);
  }

  return (
    <Container>
        <Input 
            value={phone.value}
            onChange={e => phone.onChange(e.target.value)}
            placeholder='Телефон'
        />
        <Button onClick={handleSubmit}>Отправить</Button>
        <div>
            
        </div>
    </Container>
  )
}

export default GetOrder

const Container = styled.div`
  width: 100%;
  min-height: 400px;
  padding: 10px 0;
  display: flex;
  gap: 15px;
  /* flex-direction: column; */
  /* align-items: center; */
`

const Button = styled.button`
    height: 60px;
    padding: 12px;
    background-color: #f7f7f7;
    border-radius: 15px;
    transition: all .35s ease-in;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    max-height: 60px;
    &:hover {
      background-color: #FFD700;
      color: #000;
    }
`

const Input = styled.input`
    height: 60px;
    background-color: #f7f7f7;
    padding: 12px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`