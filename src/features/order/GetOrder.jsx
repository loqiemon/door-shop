import React, { useState } from 'react'
import styled from 'styled-components'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';

import Loader from '../../components/Loader'
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

  const orders = data || [];

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
        {isLoading && <LoaderFlex><Loader/></LoaderFlex>}
        <>
          <Input 
              value={phone.value}
              onChange={e => phone.onChange(e.target.value)}
              placeholder='89008553535' 
              label='Телефон'
          />
          <Button onClick={handleSubmit}>Отправить</Button>
        </>
        {!isLoading &&  <Container2>
            {orders && orders.length === 0 && <Bold>Заказов нет</Bold>}
              {orders && orders.map((order) => (
                <Order key={order.id}>
                  <Span><Bold>Имя: </Bold>{order.name}</Span>
                  <Span><Bold>Адрес: </Bold>{order.adress}</Span>
                  <Span><Bold>Номер: </Bold>{order.phoneNumber}</Span>
                  <Span><Bold>Почта: </Bold>{order.mail}</Span>
                  <Span><Bold>Статус заказа: </Bold>{order.status}</Span>
                  <Span><Bold>Дата заказа: </Bold>{new Date(order.date).toLocaleDateString()}</Span>
                  <Span><Bold>Сумма заказа: </Bold>{order.sum} руб</Span>
                  <Span><Bold>Тип оплаты: </Bold>{order.paymentType}</Span>
                  <Span><Bold>Комментарий: </Bold>{order.commentary}</Span>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography style={{fontWeight: 'bold', fontSize: '20px'}}>Товары</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {order.accessories.map(item => 
                        <Product key={item.id}>
                          <Span><Bold>Наименование: </Bold>{item.name}</Span>
                          <Span><Bold>Артикул: </Bold>{item.vendorCode}</Span>
                          <Span><Bold>Кол-во: </Bold>{item.count}</Span>
                          <Span><Bold>Сумма: </Bold>{item.retailPrice * item.count}</Span>
                        </Product>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </Order>
              ))}
          </Container2>}
    </Container>
  )
}

export default GetOrder

const Container2 = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  gap: 15px;
`

const Order = styled.div`
  /* width: 100%; */
  width: 45%;
  padding: 10px;
  display: flex;
  flex-direction: column;  
  background-color: #fff;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 15px;
  @media (max-width: 767px) {
    width: 100%;
  }
`

const Span = styled.span`
  font-size: 18px;
`

const Bold = styled.span`
  font-weight: 600;
  font-size: 20px;
`

const Product = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
`

const LoaderFlex = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`


const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;
  padding: 10px 0;
  display: flex;
  gap: 15px;
  flex-direction: column;
  /* align-items: center; */
`

const Button = styled.button`
    height: 60px;
    max-width: 250px;
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
    /* height: 60px; */
    max-width: 250px;
    background-color: #f7f7f7;
    padding: 12px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`