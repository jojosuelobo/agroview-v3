/* eslint-disable no-unused-vars */

// Styles
import './App.css'

// Imports
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'

// Components
import Header from './Components/Header'
import Aside from './Components/Aside'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
      <Header/>
      <Aside />
        <div className="container">
          <Routes>
            <Route path='/' element={<Dashboard />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
