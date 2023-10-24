import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Carousel from 'react-material-ui-carousel'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { addToCart, readCart, removeFromCart } from '../cart/cartSlice'
import { fetchProduct } from '../../app/actionCreators'
import Loader from '../../components/Loader'
import isOurPhoto from '../../utils/isOurPhoto';



function ProductPage() {
  const { categoryId, productId, page } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [variant, setVariant] = useState({});


  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(readCart())
    setIsLoading(true)
    fetchProduct(productId)
      .then(response => {
        setProduct(response);
        setIsLoading(false);
      })
  }, []);


  const isInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  const goBack = () => {
    navigate(`/catalog/${categoryId}/${page}`)
  }

  const addProductToCart = (product) => {
    // if (variant.id !== undefined) {
      dispatch(addToCart({
        ...product, 
        count: 1,
        variant
      }))
    // } else {
    //   alert("Выберите хар-ки")
    // }
  }

  const handleChange = (id) => {
    const chara =  product.characteristics.filter(item => item.id === parseInt(id))
    if (chara.length > 0) setVariant(chara[0])
  }

  return (
      <ContainerCommon>
        {isLoading && <MyLoader><Loader/></MyLoader>}
        {!isLoading && <Back onClick={goBack}>
                            <i className="fa-solid fa-backward"></i> Назад 
                       </Back>
        }
        <Container>
          {!isLoading && 
            <>
              <SubContainer>
                {isOurPhoto(product.image).length === 1 ? 
                  <Image src={isOurPhoto(product.image)[0]} key={product.id}/>:
                  <MyCarousel>
                    {isOurPhoto(product.image).map(
                      (imgPath, i) => <Image src={imgPath} key={imgPath}/>  
                    )}
                  </MyCarousel>
                }
                {isInCart(product.id) === true ? ( 
                  <ButtonActive onClick={() => dispatch(removeFromCart(product.id))}>Уже в корзине</ButtonActive>
                ): 
                  <Button onClick={() => addProductToCart(product)} >Купить</Button>
                }
              </SubContainer>
              <SubContainer>
                <TextContainer>
                  <Span>Характеристики</Span>
                  <Characteristic>Название: <Name>{product.name}</Name></Characteristic>
                  <Characteristic>Страна: <Name>{product.country}</Name></Characteristic>
                  <Characteristic>Производитель: <Name>{product.manufacturer}</Name></Characteristic>
                  <Characteristic>Цена: <Name>{variant.priceModifier ? product.retailPrice + variant.priceModifier: product.retailPrice} руб</Name></Characteristic>
                  <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={variant.id}
                      onChange={e => handleChange(e.target.value)}
                    >
                      {product?.characteristics &&
                      product?.characteristics.length > 0 &&
                      product.characteristics.map(feature => 
                        <FormControlLabel
                          key={feature.value} 
                          value={feature.id}
                          control={<Radio />}
                          label={`${feature.value} +${feature.priceModifier} руб`} 
                        />
                      )}
                    </RadioGroup>
                </FormControl>

                  <Characteristic>
                    Наличие: <Name style={{color: product?.isAvaible.trim() === 'В наличии' ? '#A8DF8E': '#C70039'}}>{product.isAvaible}</Name>
                  </Characteristic>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Описание</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <Name>{product.description}</Name>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </TextContainer>
              </SubContainer>
            </>
          }
        </Container>
      </ContainerCommon>
  )
}

export default ProductPage


const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 10px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const ContainerCommon = styled.div`
  width: 100%;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 70%;
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
  /* flex-direction: column; */
`

const MyCarousel = styled(Carousel)`
  
`

const Image = styled.img`
  width: 450px;
  height: 450px;
  align-self: center;
  object-fit: contain;
`

const Name = styled.span`
  font-weight: 600;
  margin-left: 10px;
`

const Span = styled.span`
  font-size: 25px;
  font-weight: 500;
`

const Button = styled.button`
    padding: 12px;
    background-color: #f7f7f7;
    border-radius: 15px;
    transition: all .35s ease-in;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-weight: 600;
    width: 250px;
    margin: 0 auto;
    &:hover {
      background-color: #FFD700;
      color: #000;
    }
`
const ButtonActive = styled(Button)`
  background-color: #FFD700;
  color: #000;
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