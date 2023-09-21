import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';


import Aside from '../components/Aside';
import Loader from '../components/Loader'
import { fetchProducts } from '../app/actionCreators';
import door from '/images/doors/door.jpg'
import { addToCart } from '../features/cart/cartSlice';
import useSearch from '../hooks/useSearch';

const SellList = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  /* gap: 20px; */
  flex-wrap: wrap;
  padding-top: 10px;
  margin-top: 10px;
  /* justify-content: space-around; */
  background-color: #fff;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const SellItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 33%;
  min-width: 20%;
  gap: 5px;
  padding: 20px;
  cursor: pointer;
  transition: all .35s ease-in;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #f7f7f7;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 5px;
  /* &:hover {
    background-color: #f0f0f0;
  } */
` 

const SellImage = styled.img`
  width: 130px;
  height: 130px;

  &:hover {
    transform: scale(1.1); 
  }
`

const Main = styled.main`
  width: 100%;
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
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

const LoaderDiv =styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
`


function MainPage() {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const { categories } = useSelector(state => state.categories.categories)
  const { products, isLoading, getProductsError } = useSelector(state => state.products)

  const { searchedArray } = useSearch(products, '', 'Name')


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, []);
  
  
  
  return (
    <Main>
      <Aside/>
      <SellList>
          {isLoading && <LoaderDiv><Loader/></LoaderDiv>}
          {!isLoading && searchedArray.map(item => 
            <SellItem key={item.id}>
              <SellImage src={door}/>
              <span>{item.Name}</span>
              <span>{item.WholesalePrice}руб.</span>
              <Button onClick={() => dispatch(addToCart({...item, count: 1}))} >Купить</Button>
            </SellItem>
          )}
      </SellList>
    </Main>
  )
}

export default MainPage