import React from 'react'
import styled from 'styled-components'
import useInput from '../../shared/hooks/useInput'
import { useDispatch } from 'react-redux'
import { registerFunc } from '../../app/actionCreators'


function Register({ setShowRegister }) {
  const { value: login, onChange: handleLogin } = useInput('')
  const { value: password, onChange: handlePassword } = useInput('')
  const { value: password1, onChange: handlePassword1 } = useInput('')
  const { value: name, onChange: handleName } = useInput('')
  const { value: phoneNumber, onChange: handlePhoneNumber } = useInput('')
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (
      login.length > 3 &&
      password.length > 7 &&
      name.length > 3 &&
      password1 === password &&
      phoneNumber.length > 3
    ) {
      const user = {
        email: login,
        password,
        name,
        role: 'user',
        phoneNumber
      }
      dispatch(registerFunc(user))
    }
  }

  return (
    <AuthContainer>
      <Authinput
        placeholder='Почта'
        value={login}
        onChange={e => handleLogin(e.target.value)}
      />
      <Authinput
        placeholder='Пароль'
        type='password'
        value={password}
        onChange={e => handlePassword(e.target.value)}
      />
      <Authinput
        placeholder='Повторите пароль'
        type='password'
        value={password1}
        onChange={e => handlePassword1(e.target.value)}
      />
      <Authinput
        placeholder='Имя'
        value={name}
        onChange={e => handleName(e.target.value)}
      />
      <Authinput
        placeholder='Номер телефона'
        value={phoneNumber}
        onChange={e => handlePhoneNumber(e.target.value)}
      />
      <AuthButton onClick={handleSubmit} type='submit'>Зарегистрировать</AuthButton>
      {/* <AuthText>Уже есть аккаунт? <AuthBtn onClick={() => setShowRegister(false)}>Войти!</AuthBtn></AuthText> */}
    </AuthContainer>
  )
}

export default Register




const AuthContainer = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    justify-content: center;
`


const Authinput = styled.input`
    background-color: #f7f7f7;
    padding: 12px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const AuthButton = styled.button`
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 15px;
    transition: all .35s ease-in;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    &:hover {
      background-color: #56195d;
      color: white;
    }
    
`

const AuthText = styled.span`
  font-size: 20px;
  
`

const AuthBtn = styled.button`
  color: #56195d;
  font-weight: 500;
  transition: all .35s ease-in;
  &:hover {
    color: #340e38;
  }
`
