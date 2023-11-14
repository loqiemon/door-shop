
import { Navigate, createBrowserRouter } from 'react-router-dom'

import Categories from '../features/categories/Categories'
import MainPage from '../pages/MainPage'
import CartPage from '../pages/CartPage'
import PaymentPage from '../pages/Info/PaymentPage'
import InstallPage from '../pages/Info/InstallPage'
import DeliveryPage from '../pages/Info/DeliveryPage'
import SupportPage from '../pages/Info/SupportPage'
import ContactsPage from '../pages/Info/ContactsPage'
import RefundPage from '../pages/Info/RefundPage'
import Navbar from '../components/Navbar'
import Register from '../features/auth/Register'
import ProfilePage from '../pages/ProfilePage'
import ProductPage from '../features/products/ProductPage'
import Footer from '../components/Footer'
import AboutPage from '../pages/Info/AboutPage'
import RequisitesPage from '../pages/Info/RequisitesPage'
import { Outlet, ScrollRestoration } from 'react-router-dom'

export const appRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <>
        <Navbar />
        <Categories />
        <Outlet />
        <Footer />
      </>,
      // errorElement: <div>error</div>,
      // loader: async () => {
      //   return await console.log(1)
      // },
      children: [
        {
          path: '/catalog/:categoryId/:page',
          element: <MainPage />,
        },
        {
          path: '/cart',
          element: <CartPage />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
        {
          path: '/payment',
          element: <PaymentPage />,
        },
        {
          path: '/delivery',
          element: <DeliveryPage />,
        },
        {
          path: '/support',
          element: <SupportPage />,
        },
        {
          path: '/install',
          element: <InstallPage />,
        },
        {
          path: '/refund',
          element: <RefundPage />,
        },
        {
          path: '/contacts',
          element: <ContactsPage />,
        },
        {
          path: '/about',
          element: <AboutPage />,
        },
        {
          path: '/requisites',
          element: <RequisitesPage />,
        },
        {
          path: '/product/:categoryId/:productId/:page',
          element: <ProductPage />,
        },
      ],
    }
  ])