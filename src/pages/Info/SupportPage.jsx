import React from 'react'
import styled from 'styled-components'

function SupportPage() {
  return (
    <Container>
      <Paragraph>
        Если у Вас возникли трудности с выбором  дверной фурнитуры, замком или вы не знаете какой Вам нужен размер, то наши  технические специалисты готовы вам помочь.
        <br /><br />
        Вы можете позвонить или написать нам на номер <Link type='tel' href='tel:+7-977-454-67-77'>+7-977-454-67-77</Link>
      </Paragraph>
      {/* {new Array(21).fill(1).map((_, index) => (
        <br key={index} />
      ))} */}
    </Container>
  )
}

export default SupportPage

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
  /* @media (max-width: 991px) {
        height: auto;
    } */
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