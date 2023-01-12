import { useState } from 'react'
import { Link, Route, Routes,  } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Edit from './pages/Edit'
import Sample from './pages/Sample'
import ForgotPassword from './pages/ForgotPassword'
import useAuthContext from './context/AuthContext'
import AuthLayouts from './layouts/AuthLayouts'
import GuestLayouts from './layouts/GuestLayouts'

function App() {
  
  const { user, logout } = useAuthContext();
  return (
    <div className="bg-white min-h-screen">
        
    <div className='max-w-7xl mx-auto mt-6'>
    <Routes>
        <Route element={<AuthLayouts/>}>
          <Route path='/' element={<Home />} />
          <Route path='/edit/:id' element={<Edit />} exact />
          <Route path='/sample' element={<Sample />} exact />
        </Route>
        <Route element={<GuestLayouts/>}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Route>
    </Routes>
    </div>
    </div>
  )
}

export default App
