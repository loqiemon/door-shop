import React from 'react'
import styled from 'styled-components'

function DeliveryPage() {
  return (
    <Container>
      <Title>ОБЩИЕ УСЛОВИЯ</Title>
      <Paragraph>
        Доставка осуществляется по тарифам компании BOXBERRY, а также мы можем доставить через такие службы доставки как: ЯНДЕКС ДОСТАВКА, CDEK, ДОСТАВИСТА.
        При вызове мастера на дом доставка бесплатная (Вызов Мастера 1500 рублей в пределах МКАД. За пределами МКАД 1500 рублей + 1 км от МКАД 30 рублей )
        Доставка возможна до пункта выдачи в Вашем районе: BOXBERRY,CDEK.
        Доставка курьером возможна через: ДОСТАВИСТА, ЯНДЕКС ДОСТАВКА, CDEK.
      </Paragraph>
      <Paragraph><Subtitle>Доставка по Москве в пределах МКАД</Subtitle> — 2-3 рабочих дня после  заказа. Доставка до пункта самовывоза  BOXBERRY.</Paragraph>
      <Paragraph>      <Subtitle>Доставка по Московской области и за МКАД</Subtitle> — 2-4 рабочих дня после заказа.</Paragraph>
      <Paragraph><Subtitle>Доставка по России</Subtitle> — в среднем, от 3 до 12 рабочих дней. В регионы заказы отправляются только по предварительной оплате.</Paragraph>
      <Paragraph>      <Subtitle>Бесплатная доставка в пределах МКАД при заказе от 30 000 рублей.</Subtitle></Paragraph>
      <Paragraph>      <Subtitle>Бесплатная доставка по России осуществляется при заказе от 50 000 рублей.</Subtitle></Paragraph>
      <Paragraph><Subtitle>Время доставки</Subtitle><br />
        Время доставки согласовывается с менеджером, который обязательно свяжется с вами после того, как вы разместите свой заказ.
        Внимание! Неправильно указанный номер телефона, неточный или неполный адрес могут привести к дополнительной задержке! Пожалуйста, внимательно проверяйте ваши персональные данные при регистрации и оформлении заказа.
        Доставка выполняется в течении 3-х рабочих дней при наличии товара на складе!</Paragraph>
      <Paragraph><Subtitle>Обратите внимание</Subtitle><br />
        Обязательно убедитесь в отсутствии дефектов и комплектности товара, прежде чем расписаться в накладной.
        ПОМНИТЕ! Претензии к внешнему виду доставленного вам товара в соответствии со ст. 458 и 459 ГК РФ вы можете предъявить только до передачи вам товара продавцом. Ссылки на загрязнённость товара, недостаточную освещённость помещения, поторапливания со стороны экспедиторов и прочие причины, не являются основанием для невыполнения вами требований ст. 484 ГК РФ.</Paragraph>
      <Paragraph>
        <Subtitle>СПОСОБЫ ОПЛАТЫ</Subtitle><br />
        1. Оплата наличными или картой при получении товара по накладной в ПВЗ CDEK или BOXBERRY . Оплата производится только в рублях.<br />
        2. Оплата по безналичному расчету. При оформлении заказа Вам нужно указать реквизиты плательщика и адрес электронной почты. Вам высылается счет, после поступления денег на наш расчетный счет производится доставка товара.<br />
        3. Бесплатная доставка при вызове мастера на дом. Выезд мастера в пределах МКАД 1500 рублей. За пределами МКАД 1500 + 1 км от МКАД 30 рублей.<br />
      </Paragraph>
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
  /* height: 100%; */
`

const Title = styled.h1`
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  margin-top: 10px;
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
`