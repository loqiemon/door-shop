import React, { useState } from 'react'
import styled from 'styled-components';
import logo from '../../public/logo.svg';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 22px;
  @media (max-width: 767px) {
    justify-content: center;
  }
  @media (max-width: 576px) {
    justify-content: flex-end;
  }
`

const NavLogo = styled.img`
    width: 300px;
`

const NavLinks = styled.div`
    display: flex;
    gap: 15px;

    @media (max-width: 576px) {
        width: 100%;
        position: fixed;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100vh;
        padding: 20px 15px;
        background-color: rgba(0,0,0, 0.8);
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

export const NavLink = styled(Link)`
    color:#000;
    transition: all .3s ease-in;
    &:hover,
    &:focus{
        color: #5065f6;
    }
    &:active{
        color: #0064fa;
    };
    @media (max-width: 576px) {
        font-size: 25px;
        color: #fff;
        width: 100%;
        text-align: center;
    }
`
const HideOnMobile = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

const Hamburger = styled.div`
  @media (min-width: 576px) {
    display: none;
  }

  display: block;
  width: 30px;
  height: 20px;
  position: relative;
  cursor: pointer;


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

function Navbar() {
    const [isNavActive, setIsNavActive] = useState(false);

    const toggleNav = () => {
        setIsNavActive(!isNavActive);
    };

    return (
        <Nav>
            <HideOnMobile>
                <NavLink to='/'>
                    <NavLogo src={logo}/>
                </NavLink>
            </HideOnMobile>
            <NavLinks className={isNavActive ? 'active' : ''}>
                <NavLink to='/catalog'>Каталог</NavLink>
                <NavLink to='/cart'>Корзина</NavLink>
                <NavLink to='/profile'>Профиль</NavLink>
            </NavLinks>
            <Hamburger className={isNavActive ? 'hamburger-active' : ''} onClick={toggleNav}>
                <span></span>
                <span></span>
                <span></span>
            </Hamburger>
        </Nav>
    )
}

export default Navbar
