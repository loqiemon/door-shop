import React from 'react'
import styled from 'styled-components'
import useInput from '../../hooks/useInput'
import { useDispatch } from 'react-redux'
import { loginFunc } from '../../app/actionCreators'
import { useNavigate } from 'react-router-dom'
import { PHONENUMBER } from '../../services/constants'


function Login({setShowRegister}) {
  const dispatch = useDispatch();
  const { value: login, onChange: handleLogin } = useInput();
  const { value: password, onChange: handlePassword } = useInput();

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (login.length > 0 && password.length > 0) {
      dispatch(loginFunc(login, password));
    }
    handleLogin('');
    handlePassword('');
    navigate('/profile')
  }
 
  return (
    <AuthContainer>
      <Authinput 
        placeholder='Логин'
        value={login}
        onChange={e => handleLogin(e.target.value)}
      />
      <Authinput 
        placeholder='Пароль'
        type='password'
        value={password}
        onChange={e => handlePassword(e.target.value)}
      />
      <AuthButton onClick={handleSubmit} type='submit'>Войти</AuthButton>
      <AuthText>
        <span>Нет аккаунта? </span> 
        <AuthBtn 
          // onClick={() => setShowRegister(true)}
          >
          Оставьте заявку!
        </AuthBtn>
      </AuthText>
      {PHONENUMBER}
    </AuthContainer>
  )
}

export default Login

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
    font-weight: 600;
    font-size: 20px;
    &:hover {
      /* background-color: #56195d; */
      background-color: #FFD700;
      color: #000;
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
