import React from 'react'
import styled from 'styled-components'
import { colors } from '../../const/colors'

function Button({
  text,
  onClick,
  active = false,
  children,
  ...props
}) {
  return (
    <Btn
      onClick={onClick}
      className={active ? 'active' : ''}
      {...props}
    >
      {children || text}
    </Btn>
  )
}

export default Button


const Btn = styled.button`
  height: 60px;
  max-width: 250px;
  padding: 10px;
  background-color: #fff;
  border-radius: 15px;
  font-weight: 500;
  font-size: 20px;
  transition: all .3s ease-in;
  font-weight: 600;
  &:hover {
    /* background-color: #5065f6; */
    background-color: ${colors.gold};
    color: #000;
  }
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  &.active {
    background-color: ${colors.gold};
    color: #000;
  }
`

