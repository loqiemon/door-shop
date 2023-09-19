import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import MainPage from '../pages/MainPage'
import CartPage from '../pages/CartPage'
import Navbar from '../components/Navbar'

import Modal from '../features/modal/Modal'
import Login from '../features/auth/Login'
import { modalSlice } from '../features/modal/modalSlice'
import Categories from '../features/categories/Categories'

import { checkAuth } from './actionCreators'

import './App.scss'
import Register from '../features/auth/Register'


function App() {
  const [showRegister, setShowRegister] = useState(false);
  const { isOpen } = useSelector(state => state.modal)
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
        dispatch(checkAuth())
    }
  }, [])

  return (
    <>
       <BrowserRouter>
        {isOpen && <Modal
            children={showRegister === true ? 
              <Register setShowRegister={setShowRegister}/>
              : 
              <Login setShowRegister={setShowRegister}/>}
            onClose={() => dispatch(modalSlice.actions.close())}
        />}
        <Navbar/>
        <Routes>
          <Route path='/' element={<Categories/>}/>
          <Route path='/catalog' element={<MainPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
        </Routes>
       </BrowserRouter> 
    </>
  )
}

export default App
