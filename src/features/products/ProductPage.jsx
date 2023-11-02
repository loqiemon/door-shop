import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography';

import { addToCart, readCart, removeFromCart } from '../cart/cartSlice'
import Loader from '../../components/Loader'
import isOurPhoto from '../../utils/isOurPhoto';
import Button from '../../shared/ui/button/Button';
import { useGetProductQuery } from './productApi';
import MyAccordion from '../../shared/ui/accordion/MyAccordion'
import Radio from '../../shared/ui/radio/Radio';
import MyCarousel from '../../shared/ui/carousel/MyCarousel';

function ProductPage() {
  const { categoryId, productId, page } = useParams();
  const [variant, setVariant] = useState({});

  const user = useSelector((state) => state.auth.user)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading } = useGetProductQuery(productId, {
    refetchOnMountOrArgChange: true
  })

  const product = data || {};

  useEffect(() => {
    dispatch(readCart())
  }, []);


  const isInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  const goBack = () => {
    navigate(`/catalog/${categoryId}/${page}`)
  }

  const addProductToCart = (product) => {
    dispatch(addToCart({
      ...product,
      count: 1,
      variant
    }))
  }

  const handleChange = (id) => {
    const chara = product.characteristics.filter(item => item.id === parseInt(id))
    if (chara.length > 0) setVariant(chara[0])
  }

  const isAvailable = (product) => {
    return product?.isAvailable?.trim() === 'В наличии' ? 'available' : 'unavailable'
  }

  const countPrice = (product) => {
    if (user.role === 'user') {
      return product.wholesalePrice
    }
    return product.retailPrice
  }

  return (
    <ContainerCommon>
      {isLoading && <MyLoader><Loader /></MyLoader>}
      {!isLoading && <Back onClick={goBack}>
        <i className="fa-solid fa-backward"></i> Назад
      </Back>
      }
      <Container>
        {!isLoading &&
          <>
            <SubContainer>
              <MyCarousel>
                {isOurPhoto(product.image).map(
                  image => <Image
                    src={image}
                    key={image}
                  />
                )}
              </MyCarousel>
              {isInCart(product.id) === true ? (
                <Button
                  onClick={() => dispatch(removeFromCart(product.id))}
                  text={'Уже в корзине'}
                  className={'active'}
                  style={ButtonStyle}
                />
              ) :
                <Button
                  onClick={() => addProductToCart(product)}
                  text={'Купить'}
                  style={ButtonStyle}
                />
              }
            </SubContainer>
            <SubContainer>
              <TextContainer>
                <Span>Характеристики</Span>
                <Characteristic>Название: <Name>{product.name}</Name></Characteristic>
                <Characteristic>Страна: <Name>{product.country}</Name></Characteristic>
                <Characteristic>Производитель: <Name>{product.manufacturer}</Name></Characteristic>
                <Characteristic>Цена:
                  <Name>{countPrice(product)} руб</Name>
                </Characteristic>
                <Radio
                  value={variant.id}
                  options={product?.characteristics}
                  onChange={handleChange}
                />
                <Characteristic>
                  Наличие:
                  <Name
                    className={isAvailable(product)}
                  >
                    {product?.isAvaible ? product?.isAvaible : 'Под заказ'}
                  </Name>
                </Characteristic>
                <MyAccordion
                  label={'Описание'}
                  text={product?.description}
                />
                <MyAccordion label={'Доп. Характеристики'}>
                  {product.characteristic.length > 0 &&
                    product.characteristic.map(feature =>
                      <Typography key={feature.id}>
                        <Name>
                          {feature.characteristicType.name}: {feature.value}
                        </Name>
                      </Typography>
                    )}
                </MyAccordion>
              </TextContainer>
            </SubContainer>
          </>
        }
      </Container>
    </ContainerCommon>
  )
}

export default ProductPage

const ButtonStyle = {
  width: '100%',
  margin: '0 auto',
  marginTop: '10px',
}


const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 10px;
  padding-bottom: 20px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const ContainerCommon = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1280px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* height: 100%; */

  @media (max-width: 991px) {
    height: auto;
  }
`

const MyLoader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SubContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  border-radius: 15px;
  padding: 10px;
`

const TextContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Characteristic = styled.div`
  display: flex;
  font-size: 18px;
`

const Image = styled.img`
  width: 450px;
  height: 450px;
  align-self: center;
  object-fit: contain;

  @media (max-width: 767px) {
    width: 320px;
    height: 320px;
  }
`

const Name = styled.span`
  font-weight: 600;
  margin-left: 10px;

  .available {
    color: #A8DF8E;
  }
  .unavailable {
    color: #C70039;
  }
`

const Span = styled.span`
  font-size: 25px;
  font-weight: 500;
`



const Back = styled.span`
  padding: 10px;
  background-color: #fff;
  border-radius: 15px;
  font-weight: 500;
  font-size: 24px;
  margin-top: 20px;
  cursor: pointer;
  transition: all .35s ease-in;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  &:hover {
    transform: scale(1.1);
    box-shadow: rgba(0, 0, 0, 0.45) 0px 8px 15px;
  }
`