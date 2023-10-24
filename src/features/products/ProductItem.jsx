import React from 'react'
import styled from 'styled-components'


function ProductItem({product}) {
  return (
    <Container>
      <Image src={product.image}/>
      <Column>
        <Title>{product.name}</Title>
        <Price>
          <Prefix>Цена: </Prefix> 
          {product.wholesalePrice} руб
          </Price>
        <Country>
          <Prefix>Страна: </Prefix>
          {product.country}
          </Country>
        <Manufacturer>
          <Prefix>Производитель: </Prefix>
          {product.manufacturer}
          </Manufacturer>
        <VendorCode>
          <Prefix>Артикул: </Prefix>
          {product.vendorCode}
        </VendorCode>
        <Weight>
          <Prefix>Вес: </Prefix>
          {product.weight}
        </Weight>
        <Description>
          <Prefix>Описание: </Prefix>
          {product.description}
        </Description>
      </Column>
    </Container>
  )
}

export default ProductItem


const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;
  text-align: left;
  max-width: 650px;
  max-height: 600px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

`

const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const Description = styled.p`
  
`

const Title = styled.h2`
  font-weight: 600;
  font-size: 25px;
  color: #000;
  
`

const Price = styled.h3`
  font-weight: 500;
  font-size: 20px;
`

const Country = styled.span`
  
`

const Weight = styled.span`
  
`

const Manufacturer = styled.span`
  
`

const VendorCode = styled.span`
  
`

const Prefix = styled.span`
  font-weight: 500;
  font-size: 20px;
`
