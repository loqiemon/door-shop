import React from 'react'
import styled from 'styled-components'
import CheckIcon from '@mui/icons-material/Check';

function ContactsPage() {
  return (
    <Container>
      <Paragraph>
        Мы работаем и принимаем заказы по сервису, ремонту, установке, а также по покупке дверной фурнитуры.
        <br /><br />Принимаем заказы:
      </Paragraph>
      <List>
        <ListItem><ChechMark />Круглосуточно (через сайт или электронную почту)</ListItem>
        <ListItem><ChechMark />По телефону или в чатах telegram, whatsapp в часы работы магазина.</ListItem>
      </List>
      <Paragraph>
        <span>Режим работы: с понедельника по пятницу с 10:00 до 18:00</span>
        <span>Наш телефон: <Link type='tel' href='tel:+7-977-454-67-77'>+7- 977-454-67-77</Link></span>
        <span>Наша почта: <Link href='mailto:furniturarf@list.ru'>furniturarf@list.ru</Link></span>
        <Subtitle>ИП Кудашкин Даниил Владимирович</Subtitle>
        <Subtitle>ИНН  775104710110</Subtitle>
        <Subtitle>ОГРНИП  323774600696270</Subtitle>
      </Paragraph>
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
  height: 100%;
`

const ChechMark = styled(CheckIcon)`
  color: green;
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

const List = styled.ul`

`

const ListItem = styled.li`
  margin-top: 10px;
  text-align: left;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 5px;
`

const Paragraph = styled.p`
  text-align: left;
  line-height: 25px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Subtitle = styled.span`
  margin-top: 15px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
`

