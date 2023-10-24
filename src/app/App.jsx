import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import MainPage from '../pages/MainPage'
import CartPage from '../pages/CartPage'
import PaymentPage from '../pages/PaymentPage'
import InstallPage from '../pages/InstallPage'
import DeliveryPage from '../pages/DeliveryPage'
import SupportPage from '../pages/SupportPage'
import ContactsPage from '../pages/ContactsPage'
import RefundPage from '../pages/RefundPage'
import Navbar from '../components/Navbar'

import Modal from '../features/modal/Modal'
import Login from '../features/auth/Login'
import { modalSlice } from '../features/modal/modalSlice'
import Categories from '../features/categories/Categories'

import { checkAuth } from './actionCreators'

import Register from '../features/auth/Register'
import ProfilePage from '../pages/ProfilePage'
import ProductPage from '../features/products/ProductPage'
import Footer from '../components/Footer'



function App() {
  const [showRegister, setShowRegister] = useState(false);
  const { isOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) { 
        dispatch(checkAuth())
    }
    // getCurrency()
  }, [])

  return (
    <>
       <BrowserRouter>
        {isOpen && 
          <Modal onClose={() => dispatch(modalSlice.actions.close())}>
            {showRegister === true ? 
                <Register setShowRegister={setShowRegister}/>
                : 
                <Login setShowRegister={setShowRegister}/>
            }
          </Modal>}
        <Navbar/>
        <Routes>
          <Route path='/' element={<Categories/>}/>
          <Route path='/catalog/:categoryId/:page' element={<MainPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path="/payment" element={<PaymentPage/>}/>
          <Route path="/delivery"  element={<DeliveryPage/>}/>
          <Route path="/support"  element={<SupportPage/>}/>
          <Route path="/install"  element={<InstallPage/>}/>
          <Route path="/contacts"  element={<ContactsPage/>}/>
          <Route path="/refund"  element={<RefundPage/>}/>
          <Route path="/product/:categoryId/:productId/:page"  element={<ProductPage/>}/>
        </Routes>
        {/* <Footer/> */}
       </BrowserRouter> 
    </>
  )
}

export default App
