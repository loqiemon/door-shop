import React from 'react'
import styled from 'styled-components'

function DeliveryPage() {
  return (
    <Container>
      Страница доставки
    </Container>
  )
}

export default DeliveryPage

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  font-weight: 500;
  font-size: 20px;
  height: 100%;
`