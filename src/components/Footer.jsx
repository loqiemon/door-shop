import React from 'react'
import { Link as LinkReact } from 'react-router-dom'
import styled from 'styled-components'
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import logo from '../../public/images/favicon/android-chrome-192x192.png';
import { EMAIL, PHONENUMBER } from '../services/constants'
import VisaMaster from '../../public/images/visa-mastercard-mir@2x.png'

function Footer() {
    return (
        <Container>
            <ContainerCenter>
                {/* <SubContainer>
                <Title>О компании</Title>
                <List>
                    <Link to="/refund">Правила возврата</Link>
                    <Link to='/delivery'>Доставка</Link>
                    <Link to='/clients'>Наши клиенты</Link>
                    <Link to='/support'>Поддержка</Link>
                    <Link to='/payment'>Оплата</Link>
                </List>
            </SubContainer> */}
                {/* <SubContainer>
                <Title>Магазин</Title>
                <List>
                    <Link>Правила возврата</Link>
                    <Link></Link>
                    <Link></Link>
                    <Link></Link>
                </List>
            </SubContainer> */}
                {/* <SubContainer>
                <Title>Услуги</Title>
                <List>
                    <Link>Дверное производство</Link>
                    <Link>Строительство</Link>
                    <Link to='/install'>Установка</Link>
                </List>
            </SubContainer> */}
                <SubContainer>
                    <Title>Информация</Title>
                    <List>
                        <Link to='/about'>О компании</Link>
                        <Link to='/payment'>Оплата</Link>
                        <Link to='/delivery'>Доставка</Link>
                        <Link to='/requisites'>Реквизиты</Link>
                        {/* <Link to='/policy'>Политика конфиденциальности</Link> */}
                        <Link to='/support'>Помощь в выборе</Link>
                        <Link to='/install'>Установка</Link>
                        <Link to='/contacts'>Контакты</Link>
                        <Link to="/refund">Возврат товара</Link>
                        <Link to='/policy'>Политика конфиденциальности</Link>
                        <Link to="/deal">Договор публичной оферты</Link>
                    </List>
                </SubContainer>
                <SubContainer>
                    <Image src={logo} />
                </SubContainer>
                <SubContainer>
                    <Title>Контакты</Title>
                    <List>
                        <Phone href={`tel: ${PHONENUMBER}`} ><TelegramIcon /><WhatsAppIcon />{PHONENUMBER}</Phone>
                        <Link href={`email: ${EMAIL}`} ><EmailIcon /> {EMAIL}</Link>
                    </List>
                    <Title>Наш адрес</Title>
                    <List>
                        <Link><PlaceIcon /> Без шоурума</Link>
                        <Link><AccessTimeIcon /> Работаем с 10:00 до 18:00 (ПН-ПТ)</Link>
                    </List>
                    <Link>Мы принимаем <Visa src={VisaMaster} /></Link>
                </SubContainer>
            </ContainerCenter>

        </Container>
    )
}

export default Footer


const Image = styled.img`
    width: 192px;
    height: 192px;
    margin: 0 auto;
`

const Container = styled.footer`
    /* position: absolute;
    bottom: 0; */
    /* z-index: 1015; */
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    background-color: #000;
    justify-content: center;
    

    @media (max-width: 576px) {
        padding-bottom: 50px;
    }

    .hide-footer {
        display: none;
    }
`

const ContainerCenter = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    justify-content: space-between;

    @media (max-width: 767px) {
        flex-direction: column;
    }
`

const SubContainer = styled.footer`
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #000;
    gap: 15px;
    /* width: 30%; */

    /* @media (max-width: 991px) {
        width: 50%;
    } */
`

const Title = styled.h2`
    font-size: 25px;
    font-weight: 500;
    color: #fff;
    
    @media (max-width: 991px) {
        font-size: 23px;
    }
    @media (max-width: 767px) {
        font-size: 25px;
    }
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media (max-width: 767px) {
        align-items: center;
    }
`

const Link = styled(LinkReact)`
    color: rgba(255, 255, 255, 0.5);
    font-size: 19px;
    transition: all .35s ease-in;
    display: flex;
    gap: 3px;
    align-items: center;
    &:hover {
        color: #fff;
    }

    @media (max-width: 991px) {
        font-size: 17px;
    }
    @media (max-width: 767px) {
        font-size: 19px;
    }
`

const Phone = styled.a`
    color: #fff;
    font-size: 27px;
    display: flex;
    align-items: center;
    gap: 3px;
    @media (max-width: 576px) {
        font-size: 21px;
    }
    
`

const Visa = styled.img`
    height: 100px;
    width: 100px;
`