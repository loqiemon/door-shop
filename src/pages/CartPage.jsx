import React from 'react'
import Cart from '../features/cart/Cart'
import styled from 'styled-components'

const CartDiv = styled.div`
    padding: 10px;
`


function CartPage() {
  return (
    <CartDiv>
      <Cart />
    </CartDiv>
  )
}

export default CartPage
