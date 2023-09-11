import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import MainPage from '../pages/MainPage'
import CartPage from '../pages/CartPage'
import Navbar from '../components/Navbar'

function App() {

  return (
    <>
       <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/catalog' element={<MainPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
        </Routes>
       </BrowserRouter> 
    </>
  )
}

export default App
