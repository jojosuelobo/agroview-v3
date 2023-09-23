/* eslint-disable no-unused-vars */

// Styles
import './App.css';

// Imports
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Dashboard from './Pages/Dashboard';
import Log from './Pages/Log';
import Profile from './Pages/Profile';
import Notifications from './Pages/Notifications';
import Settings from './Pages/Settings';

import Login from './Pages/Login';
import Register from './Pages/Register';

// Components
import Header from './Components/Header';
import Aside from './Components/Aside';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Aside />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/log' element={<Log />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;