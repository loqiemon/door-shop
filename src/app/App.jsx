import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import ReactDOM from 'react-dom/client'
import Navbar from '../components/Navbar'

import Modal from '../features/modal/Modal'
import Login from '../features/auth/Login'
import { modalSlice } from '../features/modal/modalSlice'
import '../index.scss'
import { Provider } from 'react-redux'
import { checkAuth } from './actionCreators'
import { store } from './store.js'
import '../../public/fonts/bookmanOldStyle/bookmanoldstyle_bold.ttf';
import '../../public/fonts/bookmanOldStyle/bookmanoldstyle.ttf';
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRouter'
const root = document.getElementById('root');


ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <RouterProvider router={appRouter()} />
  </Provider>
)

// function App() {
//   const [showRegister, setShowRegister] = useState(false);
//   const { isOpen } = useSelector(state => state.modal);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (localStorage.getItem('accessToken')) {
//       dispatch(checkAuth())
//     }
//   }, [])

//   return (
//     <>
//       <BrowserRouter>
//         {isOpen &&
//           <Modal onClose={() => dispatch(modalSlice.actions.close())}>
//             {showRegister === true ?
//               <Register setShowRegister={setShowRegister} />
//               :
//               <Login setShowRegister={setShowRegister} />
//             }
//           </Modal>}
//         <Navbar />
//         <Routes>
//           <Route path='/' element={<Categories />} />
//           <Route path='/catalog/:categoryId/:page' element={<MainPage />} />
//           <Route path='/cart' element={<CartPage />} />
//           <Route path='/profile' element={<ProfilePage />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/delivery" element={<DeliveryPage />} />
//           <Route path="/support" element={<SupportPage />} />
//           <Route path="/install" element={<InstallPage />} />
//           <Route path="/contacts" element={<ContactsPage />} />
//           <Route path="/refund" element={<RefundPage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/requisites" element={<RequisitesPage />} />
//           <Route path="/product/:categoryId/:productId/:page" element={<ProductPage />} />
//         </Routes>
//         <Footer />
//       </BrowserRouter>
//     </>
//   )
// }

// export default App
