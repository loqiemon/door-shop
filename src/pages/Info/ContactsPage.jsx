import React from 'react'
import styled from 'styled-components'

function ContactsPage() {
  return (
    <Container>
      <Title>Реквизиты</Title>
      <Subtitle>Телефон <Link type='tel' href='tel:+7-977-454-67-77' >+7-977-454-67-77</Link></Subtitle>
      <Subtitle>Почта <Link href='mailto:furniturarf@list.ru'>furniturarf@list.ru</Link></Subtitle>
      <Subtitle>Веб-сайт <Link href='https://фурнитурарф.com/'>https://фурнитурарф.com/</Link></Subtitle>
      <Subtitle>ИНН 775104710110</Subtitle>
      <Subtitle>ОГРНИП 323774600696270</Subtitle>
      <Subtitle2>
        <Subtitle>Банковский счет </Subtitle>
        <Div>
          <Subtitle>Банк:  ООО «Банк Точка» </Subtitle>
          <Subtitle>Расчётный счет:  4080 2810 0200 0014 0182 </Subtitle>
          <Subtitle>Валюта счета: российский рубль  </Subtitle>
          <Subtitle>Корреспондентный счет: 30101810745374525104 </Subtitle>
          <Subtitle>БИК: 044525104 </Subtitle>
        </Div>
      </Subtitle2>
      <br/><br />
      <br/><br />
    </Container>
  )
}

export default ContactsPage

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  font-weight: 500;
  font-size: 20px;
  text-align: left;
`

const Link = styled.a`
  font-weight: bold;
  color: #5151e6;
`

const Title = styled.h1`
  text-align: center;
  font-size: 26px;
  font-weight: 700;
`


const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 12px;
  border-radius: 10px;
  border: 1px solid #5151e6;
`

const Subtitle = styled.span`
  margin-top: 15px;
  font-size: 20px;
  font-weight: 600;
`

const Subtitle2 = styled.div`
  margin-top: 15px;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`