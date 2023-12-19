
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from "framer-motion"

import Aside from '../components/Aside';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { addToCart, readCart, removeFromCart } from '../features/cart/cartSlice';
import { useGetProductsQuery } from '../features/products/productApi';
import copyToClipboard from '../utils/copyToClipboard'
import isOurPhoto from '../utils/isOurPhoto'


function MainPage() {
  const { categoryId, page } = useParams();
  const cartItems = useSelector((state) => state.cart.cartItems)
  const user = useSelector((state) => state.auth.user)
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    country: '',
    manufacturer: '',
    sortType: '',
    color: ''
  });

  const [acceptFilters, setAcceptFilters] = useState({
    categoryId,
    pageNumber: page,
    PageSize: 10,
  });

  const {
    data: products,
    isLoading,
    isFetching,
    error,
  } = useGetProductsQuery(acceptFilters)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    setAcceptFilters(prev => ({ ...prev, categoryId, pageNumber: page }))
    dispatch(readCart())
  }, [categoryId, page]);

  const goToProductPage = (e, itemId) => {
    if (
      !itemId ||
      (itemId && e.target && e.target.tagName !== "BUTTON" && e.target.tagName !== "P")
    ) {
      navigate(`/product/${categoryId}/${itemId}/${page}`)
    }
  };

  const isInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };


  const requestProducts = (pageNumber) => {
    let pageNumberToSet = 1;
    let filtersAreEqual = true;

    console.log(filters)
    for (const key in filters) {
      if (filters.hasOwnProperty(key) && acceptFilters.hasOwnProperty(key)) {
        if (filters[key] !== acceptFilters[key]) {
          filtersAreEqual = false;
          break;
        }
      }
    }

    if (filtersAreEqual) {
      pageNumberToSet = pageNumber;
      navigate(`/catalog/${categoryId}/${pageNumber}`);
    } else {
      navigate(`/catalog/${categoryId}/1`);
      pageNumberToSet = 1;
    }

    setAcceptFilters({
      categoryId,
      pageNumber: pageNumberToSet,
      PageSize: 10,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      searchByName: filters.search,
      country: filters.country,
      manufacturer: filters.manufacturer,
      sortType: filters.sortType,
      color: filters.color
    })
  }

  const goToPage = (pageNumber) => {
    requestProducts(pageNumber)
    // navigate(`/catalog/${categoryId}/${pageNumber}`);
  };

  const isAvaibleFunc = (isAvaible) => {
    if (isAvaible?.trim() === 'В наличии') {
      return 'avaible'
    } else {
      return 'not_avaible'
    }
  }



  return (
    <Main className='main'>
      <Aside
        categoryId={categoryId}
        filters={filters}
        setFilters={setFilters}
        requestProducts={() => requestProducts(page)}
        classes='hidden'
      />
      {(isLoading || isFetching) && <LoaderDiv><Loader /></LoaderDiv>}
      {!isLoading && !isFetching &&
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
                  filters={filters}
                  setFilters={setFilters}
                  requestProducts={() => requestProducts(page)}
                  classes=''
                />
              </Typography>
            </AccordionDetails>
          </MyAccordion>
          {products?.accessories.length > 0 && !error &&
            <>
              <SellList>
                {products.accessories.map(item =>
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
                      <SellImage src={item.image} key={item.id} /> :
                      <CarouselMy>
                        {isOurPhoto(item.image).map((imgPath, i) => <SellImage src={imgPath} key={imgPath} />)}
                      </CarouselMy>
                    }
                    <Name>{item.name}</Name>
                    <Name>{item.manufacturer}</Name>
                    <IsAvaible className={isAvaibleFunc(item.isAvaible)}>
                      {item.isAvaible}
                    </IsAvaible>
                    <Price>{user.role === 'user' ? item.wholesalePrice : item.retailPrice} руб.</Price>
                    {isInCart(item.id) === true ? (
                      <ButtonActive onClick={() => dispatch(removeFromCart(item.id))}>Уже в корзине</ButtonActive>
                    ) :
                      <Button onClick={() => dispatch(addToCart({ ...item, count: 1 }))} >Купить</Button>
                    }
                  </SellItem>
                )}
              </SellList>
              <PaginationFixed>
                <Pagination
                  page={page}
                  goToPage={goToPage}
                  totalCount={products.totalCount}
                />
              </PaginationFixed>
            </>
          }
          {products?.totalCount === 0 &&
            <Title>Таких товаров нет</Title>
          }
        </Container>
      }
    </Main>
  )
}

export default MainPage

const IsAvaible = styled.span`
  font-weight: 600;
  &.avaible {
    color: #A8DF8E;
  }

  &.not_avaible {
    color: #C70039;
  }
`

const PaginationFixed = styled.div`
  margin: 0 auto;
  /* @media (max-width: 576px) {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    padding: 10px;
    text-align: center;
    z-index: 1010;
    display: flex;
    justify-content: center;
  } */
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
  flex-wrap: wrap;
  padding-top: 10px;
  margin-top: 10px;
  justify-content: center;
  gap: 10px;
  background-color: #fff;
  border-radius: 15px;
  overflow-y: scroll;
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
  width: 45%;
  height: 380px;
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

const Main = styled.div`
  width: 100%;
  display: flex;
  max-width: 1280px;
  margin: 0 auto;

  /* height: 100%; */
  /* min-height: 500px; */
  /* height: 1920px;
  @media (max-width: 767px) {
    height: 3500px;
  } */
  padding-bottom: 40px;
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

const LoaderDiv = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
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
  /* position: absolute; */
  /* left: 50%;
  top: 25%;
  transform: translate(-50%, -50%); */
`

const Name = styled.span`
  height: 40px;
  overflow: hidden;
`

const CarouselMy = styled(Carousel)`
  width: 150px;
  height: 170px;
  margin: 0 auto;
`