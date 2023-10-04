import React, { useState, useRef } from 'react'
import styled from 'styled-components';
import logo from '../../public/images/favicon/android-chrome-192x192.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalSlice } from '../features/modal/modalSlice'

import useOnHoverOutside from '../hooks/useOnHoverOutside'
import Categories from '../features/categories/Categories'

function Navbar() {
    const [isNavActive, setIsNavActive] = useState(false);
    const isAuth = useSelector(state => state.auth.isAuth)
    const dropdownRef = useRef(null); 
    const [isMenuDropDownOpen, setMenuDropDownOpen] = useState(false);
  
    const closeHoverMenu = () => {
      setMenuDropDownOpen(false);
    };
  
    useOnHoverOutside(dropdownRef, closeHoverMenu); 
    

    const dispatch = useDispatch()

    const toggleNav = () => {
        setIsNavActive(!isNavActive);
    };


    return (
        <Nav>
            <NavContainer>
                <HideOnMobile>
                    <NavLink to='/'>
                        <NavLogo src={logo}/>
                    </NavLink>
                </HideOnMobile>
                <NavLinks className={isNavActive ? 'active' : ''}>
                    {/* <NavLink to='/'>Каталог</NavLink> */}
                    <NavLink to='/cart'>Корзина</NavLink>
                    {isAuth === true ? 
                        <NavLink to='/profile'>Профиль</NavLink>:
                        <NavLink onClick={() => dispatch(modalSlice.actions.open())}>Профиль</NavLink>
                    }
                </NavLinks>
                <Hamburger className={isNavActive ? 'hamburger-active' : ''} onClick={toggleNav}>
                    <span></span>
                    <span></span>
                    <span></span>
                </Hamburger>
            </NavContainer>
            <NavBottom className={isNavActive ? 'active' : ''}>
                <NavBottomContainer>
                    {!isNavActive && 
                        <NavBottomItem onMouseOver={() => setMenuDropDownOpen(true)}>
                            Каталог товаров
                            {isMenuDropDownOpen && 
                                <MyMenu ref={dropdownRef}>
                                    <CategoriesContainer>
                                        <Categories/>
                                    </CategoriesContainer>   
                                </MyMenu>
                            }
                        </NavBottomItem>
                    }

                    <NavBottomItem to='/payment'>Оплата</NavBottomItem>
                    <NavBottomItem to='/delivery'>Доставка по Москве</NavBottomItem>
                    <NavBottomItem to='/support'>Помощь в выборе</NavBottomItem>
                    <NavBottomItem to='/install'>Установка</NavBottomItem>
                    <NavBottomItem to='/contacts'>Контакты</NavBottomItem>
                    <NavBottomItem to='/refund'>Возврат товара</NavBottomItem>
                </NavBottomContainer>
            </NavBottom>
            <MobileNav className={isNavActive ? 'active' : ''}>
                <NavLink to='/'>Каталог</NavLink>
                <NavLink to='/cart'>Корзина</NavLink>
                {isAuth === true ? 
                    <NavLink to='/profile'>Профиль</NavLink>:
                    <NavLink onClick={() => dispatch(modalSlice.actions.open())}>Профиль</NavLink>
                }
                <NavLink  to='/payment'>Оплата</NavLink>
                <NavLink  to='/delivery'>Доставка по Москве</NavLink>
                <NavLink  to='/support'>Помощь в выборе</NavLink>
                <NavLink  to='/install'>Установка</NavLink>
                <NavLink  to='/contacts'>Контакты</NavLink>
                <NavLink  to='/refund'>Возврат товара</NavLink>
            </MobileNav>
        </Nav>
    )
}

export default Navbar

const MobileNav = styled.div`
    display: none;
    @media (max-width: 767px) {
        width: 100%;
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100vh;
        padding: 30px 15px;
        background-color: rgba(0,0,0, 0.8);

        z-index: 1000;
        transition: 0.6s all;
        &-active {
            left: 0 !important;
            width: 100%;
        }

        &.active {
            left: 0%;
        }
    }
`

const MyMenu = styled.div`
    /* position: absolute; */
    position: absolute;
    z-index: 1000;
    margin: 0 auto;
    top: 48px;
    padding: 10px;
    background-color: #fff;
`

const Nav = styled.nav`
  /* padding: 10px; */
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,.16);
  width: 100%;
  display: flex;
  /* align-items: center; */
  /* justify-content: space-between; */
  flex-direction: column;
  background-color: #fff;
  /* height: 170px; */
  font-weight: 500;
  font-size: 22px;
  /* background: url('../../public/logo.svg') center center/cover no-repeat; */
  background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);


  @media (max-width: 767px) {
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 576px) {
    justify-content: flex-end;
  }
`

const CategoriesContainer = styled.div`
    margin: 0 auto;

`

const NavLogo = styled.img`
    /* width: 300px; */
    border: none;
`

const NavContainer = styled.div`
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    height: 220px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 767px) {
        padding: 15px;
        height: 80px;
    }
`

const NavBottom = styled.div`
    width: 100%;
    background-color: #000;
    @media (max-width: 767px) {
        display: none;
    }

`

const NavBottomContainer = styled.div`
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    position: relative;
    @media (max-width: 991px) {
        font-size: 18px;
    }

    @media (max-width: 767px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }
`

const NavBottomItem = styled(Link)`
    display: flex;
    color: #fff;
    cursor: pointer;
    transition: all .35s ease-in;
    padding: 12px 5px;

    &:hover {
        background-color: #1f1e1e;
        color: #FFD700;
    }

    @media (max-width: 767px) {
        font-size: 30px;
        color: #fff;
        text-align: center;
    }

    
    @media (max-width: 576px) {
        font-size: 24px;
    }
`

const NavLinks = styled.div`
    display: flex;
    gap: 15px;

    @media (max-width: 767px) {
        display: none;
    }
`

export const NavLink = styled(Link)`
    color:#fff;
    transition: all .3s ease-in;
    &:hover,
    &:focus{
        color: #5065f6;
    }
    &:active{
        color: #0064fa;
    };
    font-size: 25px;
    font-weight: 600;

    @media (max-width: 767px) {
        font-size: 30px;
        color: #fff;
        width: 100%;
        text-align: center;

        &:focus{
            color: #ffd900b7;
        }
        &:active{
            color: #ffd900b7;
        };
    }

    @media (max-width: 576px) {
        font-size: 24px;
    }
`

const HideOnMobile = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

const Hamburger = styled.div`
  @media (max-width: 767px) {
    display: block;
  }

  display: none;
  width: 30px;
  height: 20px;
  position: relative;
  cursor: pointer;
  z-index: 1001;


  span {
    display: block;
    width: 100%;
    height: 3px;
    background: #000;
    /* position: absolute; */
    transition: transform 0.2s, opacity 0.2s, background-color 1s;
    margin-bottom: 5px;
  }

  &.hamburger-active {

    span {
        background: #fff;
        margin-bottom: -2px;
        &:nth-child(1) {
            transform: translateY(3px) rotate(-45deg);
        }
        &:nth-child(2) {
            display: none;
        }
        &:nth-child(3) {
            transform: translateY(3px) rotate(45deg);
        }
    }
  }
`;
