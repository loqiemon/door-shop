import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import MainPage from './components/MainPage'

function App() {

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
        </Routes>
       </BrowserRouter> 
    </>
  )
}

export default App
