import React from 'react'
import styled from 'styled-components'
import CheckIcon from '@mui/icons-material/Check';

function InstallPage() {
  return (
    <Container>
      <Title>Установка</Title>
      <Paragraph>
        Все наши специалисты имеют опыт более 10 лет в монтаже дверей разных модификаций, установке и замене дверных замков, а также дверных панелей и фурнитуры.  
      </Paragraph>
      <List>
        <ListItem><ChechMark/>Ремонт дверей</ListItem>
        <ListItem><ChechMark/>Замена замков</ListItem>
        <ListItem><ChechMark/>Перекодировка</ListItem>
        <ListItem><ChechMark/>Установка замков </ListItem>
        <ListItem><ChechMark/>Замена дверных панелей</ListItem>
        <ListItem><ChechMark/>Вскрытие дверей </ListItem>
      </List>
      <Paragraph>
        За консультацией обращаться по телефону <Link type='tel' href='tel:+7-977-454-67-77'>+7-977-454-67-77</Link>
      </Paragraph>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </Container>
  )
}

export default InstallPage

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  font-weight: 500;
  font-size: 20px;
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
`