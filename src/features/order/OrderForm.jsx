import React, { useState } from 'react'
import styled from 'styled-components'
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux'

import useInput from '../../shared/hooks/useInput'
import { useDispatch } from 'react-redux';
import { usePostOrderMutation, usePutOrderMutation } from './orderApi';
import { PHONENUMBER } from '../../shared/const/constants';
import { clearCart } from '../cart/cartSlice';
import AlertJsx from '../../shared/ui/Alert/Alert';
import CustomInput from '../../shared/ui/Input/CustomInput';
import Button from '../../shared/ui/Button/Button';
import CustomSelect from '../../shared/ui/Select/CustomSelect';

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
    if (!pattern.test(phone)) {
      alert("Номер должен быть в формате 89005553535");
      return
    }
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
        const editOrder = {
          id: orderProp.id,
          ...orderProp,
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
      <CustomInput
        value={name}
        onChange={e => setName(e.target.value)}
        label='Имя'
      />
      <CustomInput
        value={address}
        onChange={e => setAddress(e.target.value)}
        label='Адрес'
      />
      <CustomInput
        value={phone}
        onChange={e => setPhone(e.target.value)}
        label='Телефон'
        type='tel'
      />
      <CustomInput
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
      <CustomSelect
        value={paymentType}
        onChange={e => setPaymentType(e.target.value)}
        label="Тип оплаты"
        options={[
          { value: 'cash', text: 'Наличными' },
          { value: 'card', text: 'Картой' },
        ]}
      />
      {user && user.role === 'admin' &&
        <CustomSelect
          value={status}
          onChange={e => setStatus(e.target.value)}
          label="Статус"
          options={[
            { value: 'Не обработан', text: 'Не обработан' },
            { value: 'В обработке', text: 'В обработке' },
            { value: 'Собран', text: 'Собран' },
            { value: 'Доставлен', text: 'Доставлен' },
            { value: 'Отменен', text: 'Отменен' }
          ]}
        />
      }
      <div>
        <span>Даю согласие на обработку персональных данных</span>
        <Checkbox
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
      </div>
      <Button
        onClick={handleSubmit}
        text='Оформить заказ'
        style={{
          width: '250px',
        }}
      />
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