import React from 'react'
import styled from 'styled-components'
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import useInput from '../../shared/hooks/useInput'
import { useDispatch } from 'react-redux'
import { loginFunc } from '../../app/actionCreators'
import { useNavigate } from 'react-router-dom'
import { PHONENUMBER } from '../../shared/const/constants'
import CustomInput from '../../shared/ui/Input/CustomInput';
import Button from '../../shared/ui/Button/Button';

function Login({ setShowRegister }) {
  const { value: login, onChange: handleLogin } = useInput();
  const { value: password, onChange: handlePassword } = useInput();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <CustomInput
        placeholder='Логин'
        value={login}
        onChange={e => handleLogin(e.target.value)}
      />
      <CustomInput
        placeholder='Пароль'
        type='password'
        value={password}
        onChange={e => handlePassword(e.target.value)}
      />
      <Button
        onClick={handleSubmit}
        type='submit'
        text='Войти'
      />
      <AuthText>
        <span>Нет аккаунта? </span>
        <AuthBtn
        // onClick={() => setShowRegister(true)}
        >
          Оставьте заявку!
        </AuthBtn>
        <Link type='tel' href={`tel:${PHONENUMBER}`}>{PHONENUMBER}</Link>
        <Link type='tel' href='https://wa.me/79774546777'><WhatsAppIcon />Ватсап</Link>
        <Link type='tel' href='https://t.me/furniturarf'><TelegramIcon /> Телеграм</Link>
      </AuthText>
    </AuthContainer>
  )
}

export default Login

const Link = styled.a`
  font-weight: bold;
  color: #5151e6;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 5px;
`

const AuthContainer = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    justify-content: center;
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
