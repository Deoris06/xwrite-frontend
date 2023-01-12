import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuthContext from '../context/AuthContext'
const GuestLayouts = () => {
    const { user } = useAuthContext()
    return !user ? <Outlet /> : <Navigate to="/" />
}

export default GuestLayouts