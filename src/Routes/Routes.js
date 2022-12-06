import React from 'react'
import { Navigate } from 'react-router-dom'
import AuthAdmin from '../Pages/AuthAdmin'
import Auth from '../Pages/Auth'
import Admin from '../Pages/Admin'
import UserControllerPage from '../Pages/Admin/UserController/UserController'
import TimeTrackController from '../Pages/Admin/TimeTrackController/TimeTrackController'
import ProjectController from '../Pages/Admin/PojectController/ProjectController'
import CurrentProjectPage from '../Pages/Admin/CurrentProject/CurrentProjectPage'

export const privateRoutes = [
	{ path: '/admin/user-controller', element: <UserControllerPage /> },
	{ path: '/admin/time-track-controller', element: <TimeTrackController /> },
	{ path: '/admin', element: <ProjectController /> },
	{ path: '/admin/:id', element: <CurrentProjectPage /> }
]

export const publicRoutes = [
	{ path: 'auth-admin', element: <AuthAdmin /> },
	{ path: '/', element: <Navigate to={'/auth-admin'} /> },
	{ path: '/admin', element: <Navigate to={'/auth-admin'} /> },
	{ path: 'auth', element: <Auth /> }
]
