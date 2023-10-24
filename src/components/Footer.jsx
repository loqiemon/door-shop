import React from 'react'
import { Link as LinkReact } from 'react-router-dom'
import styled from 'styled-components'
import { PHONENUMBER } from '../services/constants'

function Footer() {
  return (
    <Container>
        <ContainerCenter>
            <SubContainer>
                <Title>О компании</Title>
                <List>
                    <Link to="/refund">Правила возврата</Link>
                    <Link to='/delivery'>Доставка</Link>
                    <Link to='/clients'>Наши клиенты</Link>
                    <Link to='/support'>Поддержка</Link>
                    <Link to='/payment'>Оплата</Link>
                </List>
            </SubContainer>
            {/* <SubContainer>
                <Title>Магазин</Title>
                <List>
                    <Link>Правила возврата</Link>
                    <Link></Link>
                    <Link></Link>
                    <Link></Link>
                </List>
            </SubContainer> */}
            <SubContainer>
                <Title>Услуги</Title>
                <List>
                    <Link>Дверное производство</Link>
                    <Link>Строительство</Link>
                    <Link to='/install'>Установка</Link>
                </List>
            </SubContainer>
            <SubContainer>
                <Title>Информация</Title>
                <List>
                    <Link to='/partners'>Партнеры</Link>
                    <Link to='/policy'>Политика конфиденциальности</Link>
                    <Link to='/support'>Помощь в выборе электронного замка</Link>
                </List>
            </SubContainer>
            <SubContainer>
                <Title>Контакты</Title>
                <List>
                    <Phone href={`tel: ${PHONENUMBER}`} >{PHONENUMBER}</Phone>
                    <Link>г. Санкт-Петербург , Волковский пр., д. 32А, БЦ «Радиус», офис 4-5</Link>
                </List>
            </SubContainer>
        </ContainerCenter>
    </Container>
  )
}

export default Footer


const Container = styled.footer`
    position: absolute;
    bottom: 0;
    z-index: 1015;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    background-color: #000;

    @media (max-width: 576px) {
        padding-bottom: 50px;
    }
`

const ContainerCenter = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
`

const SubContainer = styled.footer`
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #000;
    gap: 15px;
    width: 25%;

    @media (max-width: 991px) {
        width: 50%;
    }
`

const Title = styled.h2`
    font-size: 25px;
    font-weight: 500;
    color: #fff;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Link = styled(LinkReact)`
    color: rgba(255, 255, 255, 0.5);
    font-size: 19px;
    transition: all .35s ease-in;

    &:hover {
        color: #fff;
    }
`

const Phone = styled.a`
    color: #fff;
    font-size: 27px;
`