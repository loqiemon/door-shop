import React from 'react'
import styled from 'styled-components'
import CheckIcon from '@mui/icons-material/Check';
import door1 from '../../../public/images/doors/1.jpg'
import door2 from '../../../public/images/doors/2.jpg'
import door3 from '../../../public/images/doors/3.jpg'
import door4 from '../../../public/images/doors/4.jpg'
import door5 from '../../../public/images/doors/5.jpg'
import door6 from '../../../public/images/doors/6.jpg'
import door7 from '../../../public/images/doors/7.jpg'
import door8 from '../../../public/images/doors/8.jpg'
import door9 from '../../../public/images/doors/9.jpg'
import door10 from '../../../public/images/doors/10.jpg'
import door11 from '../../../public/images/doors/11.jpg'
import door12 from '../../../public/images/doors/12.jpg'
import Carousel from 'react-material-ui-carousel'


const images = [
  door1, door2, door3, door4, door5, door6, door7, door8, door9, door10, door11, door12
]

function CreatePage() {
  return (
    <Container>
      <Title>Установка</Title>
      <Paragraph>
        Отделка МДФ  панелями  придаст   более  украшенный  вид  вашей   входной   двери. Наша  компания  предоставит   огромный  выбор  дверных панелей  любых  размеров, цветов, толщины  и  материалов,  которые  можно  заказать  по  индивидуальным   параметрам  заказчика. Наши мастера, имеющие  многолетний  опыт  произведут   замеры, расчеты, ремонт, а также  смогут   осуществить  замену    панелей  на  входной  двери.
      </Paragraph>
      <Subtitle>Вашему  вниманию:</Subtitle>
      <List>
        <ListItem><ChechMark />Широкий  выбор  материалов  изготовления   панелей  (HPL пластик, Эко - шпон, Натуральный шпон,  Мраморные панели, Окрашенные   МДФ по таблице RAL или NCS )</ListItem>
        <ListItem><ChechMark />Накладные панели</ListItem>
        <ListItem><ChechMark />Любые  виды  фрезеровок   </ListItem>
        <ListItem><ChechMark />Надежность  и  качество </ListItem>
        <ListItem><ChechMark />Работа  с  профессионалами</ListItem>
        <ListItem><ChechMark />Низкие  цены </ListItem>
        <ListItem><ChechMark />Производство панелей,  наличников  и  доборов</ListItem>
        <ListItem><ChechMark />Гарантия </ListItem>
        <ListItem><ChechMark />Срок  изготовления  от  14  до  21 рабочего  дня </ListItem>
      </List>
      <Subtitle>Оформление  заказа:</Subtitle>
      <Paragraph>
        <List>
          <ListItem>1. Вы  звоните  нашему  менеджеру,  который  свяжет вас  с нашим  техническим  специалистом.</ListItem>
          <ListItem> 2. ЗАМЕР.  К  вам  выезжает  монтажник  на  замер. У  мастера  с  собой  будут  образцы  материалов  на  любой  вкус, а также таблица RAL (выезд  мастера  1500  рублей в  пределах  МКАД. Если  вы  находитесь  за  пределами  МКАД, то стоимость  составит  1500  рублей  +  30 руб.  за  1 км  от  МКАД). В случае  оформления  заказа  стоимость  замера  будет  вычитаться  из  общей  суммы  заказа. </ListItem>
          <ListItem>3. ЗАКЛЮЧЕНИЕ  ДОГОВОРА</ListItem>
          <ListItem>4. ДОСТАВКА И МОНТАЖ. Стоимость   доставки  5000  рублей  в  пределах  МКАД. Если вы  находитесь  за  пределами  МКАД, то  стоимость доставки  формируется из  расчета  5000 + 30 руб. за 1 км  от  МКАДа. Стоимость  монтажа рассчитывается  индивидуально,  в  зависимости  от  сложности  и  размеров дверной  конструкции.  </ListItem>
        </List>
      </Paragraph>
      <Subtitle>Фотографии наших работ: </Subtitle>
      <CarouselMy>
        {images.map((image, index) => (
          <SellImage key={index} src={image} />
        ))}
      </CarouselMy>
    </Container>
  )
}

export default CreatePage

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
`

const Subtitle = styled.span`
  margin-top: 15px;
  font-size: 20px;
  font-weight: 600;
    text-align: left;
`

const CarouselMy = styled(Carousel)`
margin-top: 15px;
  /* width: 500px;
  height: 600px; */
  min-height: 350px;
  min-width: 350px;
  margin-right: auto;
`

const SellImage = styled.img`
  /* width: 130px;
  height: 130px; */
  align-self: center;
  object-fit: contain;
`