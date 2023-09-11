import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';


const CartList = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-around;
`

const CartItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 33%;
  gap: 5px;
  padding: 5px;
  cursor: pointer;
  transition: all .35s ease-in;

  &:hover {
    background-color: #f0f0f0;
  }
` 

const CartImage = styled.img`
  
`

function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems)
    const dispatch = useDispatch()
    
  return (
    <CartList>
        {cartItems.map(item => 
          <CartItem key={item.id}>
            <CartImage src={item.image}/>
            <span>{item.name}</span>
            <span>{item.price}руб.</span>
          </CartItem>
        )}
    </CartList>
  )
}

export default Cart
