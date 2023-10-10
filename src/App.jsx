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
import Terreno from './Pages/Terreno';

import Login from './Pages/Login';
import Register from './Pages/Register';

// Components
import Header from './Components/Header';
import Aside from './Components/Aside';

function App() {
  let auth = {'token':true}

  return (
    <div className='App'>
      <BrowserRouter>
      {auth.token && <Header/>}
      {auth.token && <Aside/>}
        <Routes>
          <Route path='/' element={auth.token ? <Dashboard /> : <Login />} />
          <Route path='/log' element={auth.token ? <Log /> : <Login />} />
          <Route path='/profile' element={auth.token ? <Profile /> : <Login />} />
          <Route path='/notifications' element={auth.token ? <Notifications /> : <Login />} />
          <Route path='/settings' element={auth.token ? <Settings /> : <Login />} />
          <Route path='/terreno/:id' element={auth.token ? <Terreno /> : <Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;