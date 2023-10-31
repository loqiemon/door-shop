import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel'
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';


import OrderForm from '../order/OrderForm';
import { editInCart, readCart, removeFromCart } from './cartSlice';
import isOurPhoto from '../../utils/isOurPhoto'



function Cart() {
  const user = useSelector((state) => state.auth.user)
  const [totalPrice, setTotalPrice] = useState(0);
  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(readCart())
  }, []);

  useEffect(() => {
    if (user && user.role === 'user') {
      setTotalPrice(cartItems.reduce((acc, item) => acc + (item.wholesalePrice) * item.count, 0))
    } else {
      setTotalPrice(cartItems.reduce((acc, item) => acc + (item.retailPrice) * item.count, 0))
    }
  }, [cartItems]);


  const handleIncrement = (item) => {
    dispatch(editInCart({ ...item, count: parseInt(item.count) + 1 }))
  };

  const handleDecrement = (item) => {
    if (item.count > 1) {
      dispatch(editInCart({ ...item, count: parseInt(item.count) - 1 }))
    } else {
      dispatch(removeFromCart(item.id))
    }
  };

  const handleChange = (e, item) => {
    if (e.target.value > 1) {
      dispatch(editInCart({ ...item, count: e.target.value }))
    } else {
      dispatch(removeFromCart(item.id))
    }
  }


  return (
    <Container>
      <SubContainer>
        <Title>Оформление заказа</Title>
        <OrderForm totalPrice={totalPrice} accessories={cartItems} />
      </SubContainer>
      <SubContainer>
        <Title>Товары в корзине</Title>
        {cartItems.length === 0 && <Title>Вы не добавили товары в корзину</Title>}
        {cartItems.length !== 0 &&
          <Box sx={{ width: '100%' }}>
            <Sheet
              variant="outlined"
              sx={sheetStyle}
            >
              <Table
                borderAxis="bothBetween"
                stripe="odd"
                hoverRow
                sx={tableStyle}
              >
                <thead>
                  <tr>
                    <th style={{ width: 150 }}>Фото</th>
                    <th style={{ width: 200 }}>Наименование товара</th>
                    <th style={{ width: 130 }}>Кол-во</th>
                    <th style={{ width: 100 }}>Итого</th>
                    <th style={{ width: 30 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    const images = isOurPhoto(item.image)

                    return (
                      <TableRow key={item.id}>
                        <td>
                          {images.length === 1 ?
                            <CartImage src={images[0]} key={item.id} /> :
                            <CarouselMy>
                              {images.map((imgPath, i) => <CartImage src={imgPath} key={imgPath} />)}
                            </CarouselMy>
                          }
                        </td>
                        <td>{item.name}</td>
                        <td>
                          <Counter>
                            <CounterBtn onClick={() => handleDecrement(item)}>
                              <i className="fa-solid fa-minus"></i>
                            </CounterBtn>
                            <CounterInput
                              type="number"
                              onChange={(e) => handleChange(e, item)}
                              value={item.count}
                            />
                            <CounterBtn onClick={() => handleIncrement(item)}>
                              <i className="fa-solid fa-plus"></i>
                            </CounterBtn>
                          </Counter>
                        </td>
                        {/* <td>{(item.retailPrice + item.variant.priceModifier) * item.count} руб.</td> */}
                        <td>{(user.role === 'user' ? item.wholesalePrice : item.retailPrice) * item.count} руб.</td>
                        <td>
                          <i className="fa-solid fa-trash" onClick={() => dispatch(removeFromCart(item.id))}></i>
                        </td>
                      </TableRow>
                    )
                  })}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Итого: </td>
                    <td>{totalPrice} руб.</td>
                  </tr>
                </tbody>
              </Table>
            </Sheet>
          </Box>
        }
      </SubContainer>
    </Container>
  )
}

export default Cart


const TableRow = styled.tr`
  @media (max-width: 991px) {
    /* width: 100%;
    display: flex;
    flex-direction: column; */
  }
`

const sheetStyle = {
  '--TableCell-height': '40px',
  '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
  '--Table-firstColumnWidth': '80px',
  '--Table-lastColumnWidth': '144px',
  '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
  '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
  overflow: 'auto',
  background: (theme) =>
    `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
    linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
    radial-gradient(
      farthest-side at 0 50%,
      rgba(0, 0, 0, 0.12),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
        farthest-side at 100% 50%,
        rgba(0, 0, 0, 0.12),
        rgba(0, 0, 0, 0)
      )
      0 100%`,
  backgroundSize:
    '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'local, local, scroll, scroll',
  backgroundPosition:
    'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
  backgroundColor: 'background.surface',
}

const tableStyle = {
  '& tr > *:first-child': {
    position: 'sticky',
    left: 0,
    boxShadow: '1px 0 var(--TableCell-borderColor)',
    bgcolor: 'background.surface',
  },
  '& tr > *:last-child': {
    position: 'sticky',
    right: 0,
    bgcolor: 'var(--TableCell-headBackground)',
  },
}

const Container = styled.div`
  width: 100%;
  display: flex;
  max-width: 1280px;
  margin: 0 auto;

  @media (max-width: 1199px) {
    flex-direction: column;
  }
`

const SubContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 0;


  @media (max-width: 1199px) {
    width: 100%;
    &:first-child {
      order: 2;
    }
    &:last-child {
      order: 1;
    }
  }
`

const Title = styled.h2`
  font-weight: 500;
  font-size: 35px;
`



const Name = styled.span`
  width: 190px;
  text-overflow: ellipsis;
`


const CartImage = styled.img`
  height: 130px;
  width: 130px;
  object-fit: contain;
  background-color: #fff;
`

const CarouselMy = styled(Carousel)`
  width: 130px;
  height: 130px;
`

const Counter = styled.div`
  display: flex;
`

const CounterInput = styled.input`
  width: 50px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  padding: 6px;
  text-align: center;
  font-weight: 400;
`

const CounterBtn = styled.button`
  background-color: #FFD700;
  padding: 10px;
  transition: all .15s ease-in;
  
  &:hover {
    color: #7c7676;
    transform: scale(1.1);
  }
`


