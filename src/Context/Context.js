import { createContext } from 'react'

function noop() {}

export const AuthContext = createContext({
	token: null,
	login: noop,
	logOut: noop,
	isAuth: false
})
