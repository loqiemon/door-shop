
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel'
import { useNavigate } from 'react-router-dom';
import ProductItem from '../features/products/ProductItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Aside from '../components/Aside';
import Loader from '../components/Loader'
import { fetchProducts } from '../app/actionCreators';
import { addToCart, readCart, removeFromCart } from '../features/cart/cartSlice';
import useSearch from '../hooks/useSearch';
import { useParams } from 'react-router-dom';
import copyToClipboard from '../utils/copyToClipboard'
import Pagination from '../components/Pagination';
import Modal from '../features/modal/Modal';


function MainPage() {
  const { categoryId, page } = useParams();
  const cartItems = useSelector((state) => state.cart.cartItems)
  const { categories } = useSelector(state => state.categories.categories)
  const { products, isLoading, getProductsError, count } = useSelector(state => state.products)
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({minPrice: '', maxPrice: '', country: '', manufacturer: ''});
  const [selectedItem, setSelectedItem] = useState(null);
  
  const navigate = useNavigate();

  const goToProductPage = (e, itemId) => {
    if (
      !itemId ||
      (itemId && e.target && e.target.tagName !== "BUTTON" && e.target.tagName !== "P")
    ) {
      setSelectedItem(itemId);
      navigate(`/product/${categoryId}/${itemId}/${page}`)
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const isInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts({
      categoryId, 
      pageNumber: page,
      PageSize: 10
    }))
    dispatch(readCart())
  }, [categoryId]);

  const requestProducts = (pageNumber) => {
    const filterParams = {
      categoryId,
      pageNumber,
      PageSize: 10,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      searchByName: search,
      country: filters.country,
      manufacturer: filters.manufacturer
    }
    dispatch(fetchProducts(filterParams))
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
        requestProducts={() => requestProducts(page)}
        classes='hidden'
      />
      {isLoading && <LoaderDiv><Loader/></LoaderDiv>}
      {!isLoading && 
        <Container>
          <MyAccordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Фильтры</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              <Aside 
                search={search}
                setSearch={setSearch}
                filters={filters}
                setFilters={setFilters}
                requestProducts={() => requestProducts(page)}
                classes=''
              />
              </Typography>
            </AccordionDetails>
          </MyAccordion>
          <SellList>
              {products.map(item => 
                <SellItem
                  key={item.id}
                  onClick={(e) => goToProductPage(e, item.id)}
                >
                  <VendorCode
                    onClick={() => copyToClipboard(item.vendorCode)}
                  >
                      ID {item.vendorCode}
                  </VendorCode>
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
              {!isLoading && products.length === 0 &&
                <Title>Таких товаров нет</Title>
              }
          </SellList>
            <PaginationFixed>
              <Pagination
                totalItems={products}
                page={page}
                goToPage={goToPage}
                totalCount={count}
              />
            </PaginationFixed>
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


const PaginationFixed = styled.div`
  margin: 0 auto;
  @media (max-width: 576px) {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    padding: 10px;
    text-align: center;
    z-index: 1010;
    display: flex;
    justify-content: center;
  }
`

const MyAccordion = styled(Accordion)`
  margin-top: 10px;
  display: none;
  @media (max-width: 991px) {
    display: block;
  }
`

const SellList = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  /* height: 700px; */
  /* max-height: 700px; */
  flex-wrap: wrap;
  padding-top: 10px;
  margin-top: 10px;
  /* overflow-y: scroll; */
  justify-content: center;
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

  /* @media (max-width: 991px) {
    min-height: 300px;
    max-height: 90%;
  } */
  padding-bottom: 30px;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 30px;
`

const SellItem = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  /* min-width: 200px; */
  width: 31%;
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

  @media (max-width: 1199px) {
    max-width: 45%;
    min-width: 45%;
  }

  @media (max-width: 767px) {
    max-width: 100%;
    min-width: 100%;
  }
` 

const SellImage = styled.img`
  width: 130px;
  height: 130px;
  align-self: center;
  object-fit: contain;
`

const Main = styled.main`
  width: 100%;
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  /* height: 100%; */
`

const Button = styled.button`
  padding: 12px;
  background-color: #f7f7f7;
  border-radius: 15px;
  transition: all .35s ease-in;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  font-weight: 600;
  &:hover {
    background-color: #FFD700;
    color: #000;
  }
`

const ButtonActive = styled(Button)`
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