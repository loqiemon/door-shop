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

const Counter = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  margin: 0 5px;
`;

function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems)
    const dispatch = useDispatch()

    const handleIncrement = (item) => {
    
    };
  
    const handleDecrement = (item) => {
     
    };
    
  return (
    <CartList>
        {cartItems.map(item => 
          <CartItem key={item.id}>
            <CartImage src={item.image}/>
            <span>{item.name}</span>
            <span>{item.price}руб.</span>
            <Counter>
              <Button onClick={() => handleDecrement(item)}>-</Button>
              <span>0</span> 
              <Button onClick={() => handleIncrement(item)}>+</Button>
            </Counter>
          </CartItem>
        )}
    </CartList>
  )
}

export default Cart
