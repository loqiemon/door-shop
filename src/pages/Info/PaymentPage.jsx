import React from 'react'
import styled from 'styled-components'

import sbp from '../../../public/images/payment/sbp.png'
import mastercard from '../../../public/images/payment/mastercard.svg'
import visa from '../../../public/images/payment/visa.svg'
import mir from '../../../public/images/payment/mir.svg'

function PaymentPage() {
  return (
    <Container>
      <Title>Способы оплаты</Title>
      <Paragraph>
        После оформления заказа с вами свяжется  наш менеджер для подтверждения заказа  и  согласования  даты  доставки. <br /><br />
        Оплата производится любым удобным для вас способом:<br /><br />
        После подтверждения заказа, менеджер отправляет на вашу электронную почту или  номер телефона ссылку для проведения оплаты. Оплата также возможна  через <Image src={sbp} />  по QR коду. Проведение платежей по банковским картам осуществляется в строгом соответствии с требованиями таких платежных систем как: <Image src={mir} />  <Image src={visa} /> <Image src={mastercard} />
      </Paragraph>
      <Paragraph><Subtitle>Безналичный расчёт. </Subtitle>Доставка или самовывоз товара, осуществляется не ранее дня зачисления денежных средств на расчётный счет.
      </Paragraph>
      <Paragraph><Subtitle>Безналичный расчёт для юридических лиц. </Subtitle>Безналичные платежи на наш расчетный счет. Наша компания работает без НДС.</Paragraph>
      <Paragraph><Subtitle>Оплата при получении </Subtitle>заказа в пунктах выдачи BOXBERRY или CDEK – наличными или банковской картой.</Paragraph>
      <Paragraph><Subtitle>Оплата на сайте </Subtitle>(технически разрабатывается)</Paragraph>
      <Paragraph>
        <Subtitle>Отменить или переоформить новый  заказ </Subtitle>
        вы  можете  обратившись  к  нашему менеджеру. <br /><br />
        Возврат  денежных  средств  при  безналичном  способе  оплаты, производится на  ваш  банковский  счёт в течение 3 - 10 рабочих дней (зависит  от  вашего банка).
      </Paragraph>
      <Paragraph>
        <Subtitle>
          Подробнее о вариантах оплаты и доставки Вы можете узнать по телефону:+7-(977)-454-67-77.
        </Subtitle> </Paragraph>
    </Container>
  )
}

export default PaymentPage

const Image = styled.img`
  height: 30px;
  width: 50px;
  vertical-align: bottom;
  margin: 0 10px;
`

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
  margin-top: 13px;
`

const Subtitle = styled.span`
  margin-top: 15px;
  font-size: 20px;
  font-weight: 600;
`