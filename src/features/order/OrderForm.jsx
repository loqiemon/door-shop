import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux'

import useInput from '../../hooks/useInput'
import { useDispatch } from 'react-redux';
import { usePostOrderMutation, usePutOrderMutation } from './orderApi';
import { PHONENUMBER } from '../../services/constants';
import { clearCart } from '../cart/cartSlice';
import AlertJsx from '../../components/Alert';

// import { addOrderRequest } from '../../app/actionCreators';

function OrderForm({
  totalPrice,
  accessories,
  formType = "create",
  orderProp = {},
  setIsModalOpen
}) {
  const { value: name, onChange: setName } = useInput(orderProp?.name || '');
  const { value: email, onChange: setEmail } = useInput(orderProp?.mail || '');
  const { value: address, onChange: setAddress } = useInput(orderProp?.adress || '');
  const { value: phone, onChange: setPhone } = useInput(orderProp?.phoneNumber || '');
  const { value: comment, onChange: setComment } = useInput(orderProp?.commentary || '');
  const [status, setStatus] = useState(orderProp?.status || '');
  const [paymentType, setPaymentType] = useState(orderProp?.paymentType || 'cash');
  const [checked, setChecked] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [postOrder, { isLoading, error }] = usePostOrderMutation();
  const [putOrder, { isLoading: putLoading, error: putError }] = usePutOrderMutation();

  const showAlert = () => {
    setIsAlertVisible(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 5000);
  };

  const handleSubmit = () => {
    const pattern = /^[0-9]{11}$/;
    // if (!pattern.test(phone)) {
    //   alert("Номер должен быть в формате 89005553535");
    //   return
    // }
    if (
      name.length > 0 &&
      address.length > 0 &&
      email.length > 0 &&
      email.match(validEmailRegex) &&
      phone.length > 0,
      checked
    ) {
      const order = {
        name,
        mail: email,
        adress: address,
        phoneNumber: phone,
        commentary: comment,
        paymentType,
        status: status || 'Не обработан',
        accessory: accessories.map(item => {
          return {
            ...item,
            accessoryId: item.id,
            count: item.count
          }
        })
      }
      if (formType === 'create') {
        postOrder(order)
          .then(() => {
            dispatch(clearCart());
            showAlert();
          })
          .catch((error) => {
            alert(`Не удалось добавить заказ. Свяжитесь с нами ${PHONENUMBER} `);
          });
      } else {
        console.log(orderProp)
        const editOrder = {
          id: orderProp.id,
          ...orderProp,
          sum: parseInt(orderProp.sum),
          name,
          mail: email,
          adress: address,
          phoneNumber: phone,
          commentary: comment,
          paymentType,
          status: status,
          orderAccessories: accessories.map(item => {
            return {
              ...item,
              accessoryId: item.id,
              count: item.count
            }
          })
        }
        putOrder(editOrder)
          .then(() => {
            showAlert();
            setIsModalOpen(false);
          })
          .catch((error) => {
            alert(`Не удалось изменить заказ.`);
          });
      }
      // dispatch(addOrderRequest(order))
      setName('')
      setEmail('')
      setAddress('')
      setPhone('')
      setComment('')
      setChecked(false)
    }
  }


  return (
    <Container>
      <Input
        value={name}
        onChange={e => setName(e.target.value)}
        label='Имя'
      />
      <Input
        value={address}
        onChange={e => setAddress(e.target.value)}
        label='Город'
      />
      <Input
        value={phone}
        onChange={e => setPhone(e.target.value)}
        label='Телефон'
        type='tel'

      />
      <Input
        value={email}
        onChange={e => setEmail(e.target.value)}
        label='Почта'
        type='email'
      />
      <StyledTextarea
        aria-label="Комментарий"
        minRows={3}
        value={comment}
        onChange={e => setComment(e.target.value)}
        label="Комментарий"
        placeholder='Комментарий'
      />
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Тип оплаты</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={paymentType}
          onChange={e => setPaymentType(e.target.value)}
          label="Type"
        >
          <MenuItem value="cash">Наличными</MenuItem>
          <MenuItem value="card">Картой</MenuItem>
        </Select>
      </FormControl>
      {user && user.role === 'admin' &&
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Статус</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={status}
            onChange={e => setStatus(e.target.value)}
            label="Type"
          >
            <MenuItem value="Не обработан">Не обработан</MenuItem>
            <MenuItem value="В обработке">В обработке</MenuItem>
            <MenuItem value="Собран">Собран</MenuItem>
            <MenuItem value="Доставлен">Доставлен</MenuItem>
            <MenuItem value="Отменен">Отменен</MenuItem>
          </Select>
        </FormControl>
      }
      <div>
        <span>Даю согласие на обработку персональных данных</span>
        <Checkbox
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
      </div>
      <Button onClick={handleSubmit}>Оформить заказ</Button>
      {isAlertVisible && <AlertJsx
        message={'Заказ успешно оформлен. Менеджер свяжется с вами.'}
        onClose={() => setIsAlertVisible(false)}
        type={'success'} />
      }
    </Container>
  )
}

export default OrderForm


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 20px;
    align-items: center;
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
    width: 100%;
    max-width: 450px;
    background-color: #f7f7f7;
    padding: 12px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const Button = styled.button`
    width: 250px;
    margin: 0 auto;
    padding: 12px;
    background-color: #f7f7f7;
    border-radius: 15px;
    transition: all .35s ease-in;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-size: 22px;
    font-weight: 700;

    &:hover {
      background-color: #FFD700;
      color: #000;
      box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 17px;
    }
`

const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  max-width: 450px;
  background-color: #f7f7f7;
  padding: 12px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;


  &:focus {
    background-color: #ffffff; 
    border: 1px solid #56195d; 
    outline: none;
  }
`