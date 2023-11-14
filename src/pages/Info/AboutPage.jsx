import React from 'react'
import styled from 'styled-components'

const items = [
  "CISA",
  "MOTTURA",
  "ARMADILLO",
  "FUARO",
  "PUNTO",
  "AJAX",
  "KALE KILIT",
  "AGB",
  "COLLECTION SONOMINI CARLO",
  "COMUNELLO",
  "ГАРДИАН",
  "BORDER",
  "ПРОСАМ",
  "МЕТТЭМ",
  "ЭЛЬБОР",
  "CRIT",
  "KAADAS",
  "PROFFLEX",
  "KERBEROS",
  "СЕАН",
  "СКОБИС",
  "CORNI ASSA ABLOY",
  "ПЕНЗМАРШ",
  "CLASS",
  "TRELLEBORG",
  "DROMAKABA",
  "OTLAV",
  "ОМЕГА",
  "BONAITI",
  "ЗЕНИТ ХИММАРШ",
  "ЧАЗ",
  "PHILIPS",
  "SOLITY",
  "AQARA",
  "SECURAME",
  "EVVA"
];


function AboutPage() {
  return (
    <Container>
      <Paragraph>
        <Subtitle>Большой опыт</Subtitle> наконец-то позволил открыть торговую площадку по продаже дверной фурнитуры именно для Вас! Благодаря нашей практике, мы готовы предложить Вам исключительно качественный продукт.<br />
      </Paragraph>
      <Paragraph>
        <Subtitle>Наша миссия</Subtitle> - способствовать безопасности Вашего дома.<br />
      </Paragraph>
      <Paragraph>
        <Subtitle>Наша цель</Subtitle> - постоянное улучшение качества сервиса как в продажах, так и в услугах. Вопросы клиентов мы стараемся решить всеобъемлюще и максимально оперативно.
        Мы работаем с надежными поставщиками, чтобы вы могли быть уверены в качестве каждого предложенного нами товара.
      </Paragraph>
      <Subtitle>
        Наши бренды
      </Subtitle>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </List>
      <Subtitle>
        Контакты для заказов: <Link href="mailto:furniturarf@list.ru">furniturarf@list.ru</Link> <Link href="tel:+79774546777">+7-977-454-67-77</Link>
      </Subtitle>
    </Container>
  )
}

export default AboutPage

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  /* height: 50vh; */
  font-weight: 500;
  font-size: 20px;
  height: 100%;
  @media (max-width: 576px) {
    height: auto;
  }
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
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const ListItem = styled.li`
  margin-top: 10px;
  text-align: left;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
`

const Paragraph = styled.p`
  text-align: left;
  line-height: 25px;
  margin-top: 10px;
`

const Subtitle = styled.span`
  margin-top: 15px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
`