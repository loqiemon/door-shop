import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import MainPage from '../pages/MainPage'
import CartPage from '../pages/CartPage'
import PaymentPage from '../pages/Info/PaymentPage'
import InstallPage from '../pages/Info/InstallPage'
import DeliveryPage from '../pages/Info/DeliveryPage'
import SupportPage from '../pages/Info/SupportPage'
import ContactsPage from '../pages/Info/ContactsPage'
import RefundPage from '../pages/Info/RefundPage'
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
import AboutPage from '../pages/Info/AboutPage'
import RequisitesPage from '../pages/Info/RequisitesPage'
import PolicyPage from '../pages/Info/PolicyPage'
import DealPage from '../pages/Info/DealPage'
import CreatePage from '../pages/Info/CreatePage'



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
              <Register setShowRegister={setShowRegister} />
              :
              <Login setShowRegister={setShowRegister} />
            }
          </Modal>}
        <Navbar />
        <Routes>
          <Route path='/' element={<Categories />} />
          <Route path='/catalog/:categoryId/:page' element={<MainPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/install" element={<InstallPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/deal" element={<DealPage />} />
          <Route path="/requisites" element={<RequisitesPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/product/:categoryId/:productId/:page" element={<ProductPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
