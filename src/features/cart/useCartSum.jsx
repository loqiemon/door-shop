import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import { readCart } from './cartSlice';


function useCartSum() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user)
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(readCart())
  }, []);

  useEffect(() => {
    if (user && user.role === 'user') {
      setTotalPrice(Number(cartItems.reduce((acc, item) => acc + (item.wholesalePrice) * item.count, 0).toFixed(2)))
    } else {
      setTotalPrice(Number(cartItems.reduce((acc, item) => acc + (item.retailPrice) * item.count, 0)).toFixed(2))
    }
  }, [cartItems]);

  return (totalPrice)
}

export default useCartSum