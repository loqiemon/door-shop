import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';


import Aside from '../components/Aside';
import Loader from '../components/Loader'
import { fetchProducts } from '../app/actionCreators';
import { addToCart, readCart, removeFromCart } from '../features/cart/cartSlice';
import useSearch from '../hooks/useSearch';
import { useParams } from 'react-router-dom';
import Modal from '../features/modal/Modal';

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
  flex-direction: column;
  text-align: left;
  max-width: 33%;
  min-width: 20%;
  gap: 5px;
  padding: 20px;
  position: relative;
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
  align-self: center;
  object-fit: contain;
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

const ButtonActive = styled(Button)`
  background-color: #56195d;
  color: white;
`

const LoaderDiv =styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
`

const VendorCode = styled.span`
  position: absolute;
  top: 0;
  left: 5px;
  font-weight: 400;

  &:hover {
    color: #56195d;
    font-weight: 600;
  }
`

const Price = styled.span`
  font-weight: 600;

`


function MainPage() {
  const { categoryId } = useParams();
  const cartItems = useSelector((state) => state.cart.cartItems)
  const { categories } = useSelector(state => state.categories.categories)
  const { products, isLoading, getProductsError } = useSelector(state => state.products)
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({minPrice: '', maxPrice: ''});
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (e, item) => {
    if (
      !item ||
      (item && e.target && e.target.tagName !== "BUTTON" && e.target.tagName !== "SPAN")
    ) {
      setSelectedItem(item);
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const { searchedArray } = useSearch(products, search, 'Name')

  const filteredArray = searchedArray.filter(item => {
    const price = parseFloat(item.WholesalePrice); 
    const minPriceFilter = filters.minPrice !== '' ? parseFloat(filters.minPrice) : null;
    const maxPriceFilter = filters.maxPrice !== '' ? parseFloat(filters.maxPrice) : null;

    if (minPriceFilter !== null && price < minPriceFilter) {
      return false; 
    }
    if (maxPriceFilter !== null && price > maxPriceFilter) {
      return false; 
    }

    return true; 
  });

  const isInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts(categoryId))
    dispatch(readCart())
  }, []);
  
  
  return (
    <Main>
      <Aside 
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />
      <SellList>
          {isLoading && <LoaderDiv><Loader/></LoaderDiv>}
          {!isLoading && filteredArray.map(item => 
            <SellItem key={item.id} onClick={(e) => openModal(e, item)}>
              <VendorCode onClick={() => {navigator.clipboard.writeText(item.VendorCode)}}>ID {item.VendorCode}</VendorCode>
              <SellImage src={item.Image}/>
              <span>{item.Name}</span>
              <Price>{item.WholesalePrice} руб.</Price>
              {isInCart(item.id) === true ? ( 
                <ButtonActive onClick={() => dispatch(removeFromCart(item.id))}>Уже в корзине</ButtonActive>
              ): 
                <Button onClick={() => dispatch(addToCart({...item, count: 1}))} >Купить</Button>
              }
            </SellItem>
          )}
      </SellList>
      {selectedItem && (
        <Modal onClose={closeModal}>
          <div>
            <h2>{selectedItem.Name}</h2>
            <p>ID {selectedItem.VendorCode}</p>
            <img src={selectedItem.Image} alt={selectedItem.Name} />
            <p>{selectedItem.WholesalePrice} руб.</p>
            <button onClick={closeModal}>Закрыть</button>
          </div>
        </Modal>
      )}
    </Main>
  )
}

export default MainPage