import React from 'react'
import { Navigate } from 'react-router-dom'
import AuthAdmin from '../Pages/AuthAdmin'
import Auth from '../Pages/Auth'
import Admin from '../Pages/Admin'
import UserControllerPage from '../Pages/Admin/UserController/UserController'

export const privateRoutes = [
	{ path: '/admin', element: <Admin /> },
	{ path: '/admin/user-controller', element: <UserControllerPage /> }
]

export const publicRoutes = [
	{ path: 'auth-admin', element: <AuthAdmin /> },
	{ path: '/', element: <Navigate to={'/auth-admin'} /> },
	{ path: '/admin', element: <Navigate to={'/auth-admin'} /> },
	{ path: 'auth', element: <Auth /> }
]
