import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel'
import { useNavigate } from 'react-router-dom';

import Aside from '../components/Aside';
import Loader from '../components/Loader'
import { fetchProducts } from '../app/actionCreators';
import { addToCart, readCart, removeFromCart } from '../features/cart/cartSlice';
import useSearch from '../hooks/useSearch';
import { useParams } from 'react-router-dom';
import Modal from '../features/modal/Modal';
import ProductItem from '../features/products/ProductItem';
import Pagination from '../components/Pagination';


function MainPage() {
  const { categoryId, page } = useParams();
  const cartItems = useSelector((state) => state.cart.cartItems)
  const { categories } = useSelector(state => state.categories.categories)
  const { products, isLoading, getProductsError } = useSelector(state => state.products)
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({minPrice: '', maxPrice: ''});
  const [selectedItem, setSelectedItem] = useState(null);
  
  const navigate = useNavigate();

  const openModal = (e, item) => {
    if (
      !item ||
      (item && e.target && e.target.tagName !== "BUTTON" && e.target.tagName !== "P")
    ) {
      setSelectedItem(item);
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const { searchedArray } = useSearch(products, search, 'name')

  const filteredArray = searchedArray.filter(item => {
    const price = parseFloat(item.retailPrice); 
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
    dispatch(fetchProducts(categoryId, page, 10))
    dispatch(readCart())
  }, [categoryId]);

  const requestProducts = (pageNumber) => {
    dispatch(fetchProducts(categoryId, pageNumber, 10))
  }

  const goToPage = (pageNumber) => {
    requestProducts(pageNumber)
    navigate(`/catalog/${categoryId}/${pageNumber}`);
  };
   
  return (
    <Main>
      <Aside 
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />
      {isLoading && <LoaderDiv><Loader/></LoaderDiv>}
      {!isLoading && 
        <Container>
          <SellList>
              {filteredArray.map(item => 
                <SellItem key={item.id} onClick={(e) => openModal(e, item)}>
                  <VendorCode onClick={() => {navigator.clipboard.writeText(item.vendorCode)}}>ID {item.vendorCode}</VendorCode>
                  {item.image.split(' ').length === 1 ? 
                    <SellImage src={item.image} key={item.id}/>:
                    <CarouselMy>
                      {item.image.split(' ').map( (imgPath, i) => <SellImage src={imgPath} key={imgPath}/> )}
                    </CarouselMy>
                  }
                  <Name>{item.name}</Name>
                  <Price>{item.retailPrice} руб.</Price>
                  {isInCart(item.id) === true ? ( 
                    <ButtonActive onClick={() => dispatch(removeFromCart(item.id))}>Уже в корзине</ButtonActive>
                  ): 
                    <Button onClick={() => dispatch(addToCart({...item, count: 1}))} >Купить</Button>
                  }
                </SellItem>
              )}
              {!isLoading && filteredArray.length === 0 &&
                <Title>Таких товаров нет</Title>
              }
          </SellList>
          <Pagination totalItems={products} page={page} goToPage={goToPage}/>
        </Container>
      }
      {selectedItem && (
        <Modal onClose={closeModal}>
          <ProductItem product={selectedItem} />
        </Modal>
      )}
    </Main>
  )
}

export default MainPage


const SellList = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  height: 700px;
  /* gap: 20px; */
  flex-wrap: wrap;
  padding-top: 10px;
  margin-top: 10px;
  overflow-y: scroll;
  /* justify-content: space-around; */
  gap: 10px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  &::-webkit-scrollbar {
		width: 5px;           
	}
	  
  &::-webkit-scrollbar-track {
    background: rgba(0,0,0,0);      
  }
	  
	&::-webkit-scrollbar-thumb {
		background-color: #555;  
		border-radius: 20px;      
	}
	
	scrollbar-width: thin;
	scrollbar-color: #555 rgba(0,0,0,0);  
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const SellItem = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 200px;
  height: 300px;
  gap: 5px;
  padding: 20px;
  position: relative;
  cursor: pointer;
  transition: all .35s ease-in;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #f7f7f7;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 5px 5px;
  /* &:hover {
    background-color: #f0f0f0;
  } */
` 

const SellImage = styled.img`
  width: 130px;
  height: 130px;
  align-self: center;
  object-fit: contain;
  /* &:hover {
    transform: scale(1.1); 
  } */
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
    font-weight: 600;
    &:hover {
      /* background-color: #56195d; */
      background-color: #FFD700;

      color: #000;
    }

`

const ButtonActive = styled(Button)`
  /* background-color: #56195d; */
  background-color: #FFD700;
  color: #000;
`

const LoaderDiv =styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
`

const VendorCode = styled.p`
  position: absolute;
  top: 0;
  left: 5px;
  font-weight: 400;
  max-width: 180px;
  max-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    color: #56195d;
    font-weight: 600;
  }
`

const Price = styled.span`
  font-weight: 600;

`

const Title = styled.h2`
  font-weight: 600;
  font-size: 27px;
  color: #000;
  position: absolute;
  left: 43%;
  top: 43%;
`

const Name = styled.span`
  height: 40px;
  overflow: hidden;
`

const CarouselMy = styled(Carousel)`
  width: 130px;
  height: 130px;
`