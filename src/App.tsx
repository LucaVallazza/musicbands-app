import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import LogInPage from './pages/login-page'
import BandsPage from './pages/bands-page'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes> 
        <Route path = '/' element = {<Navigate to = {'/login'}></Navigate>}></Route>
        <Route path = '/login' element= {<LogInPage />}></Route>
        <Route path = '/bands' element= {<BandsPage />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
