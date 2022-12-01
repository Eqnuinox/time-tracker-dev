import { useCallback, useEffect, useState } from 'react'
import { instance } from '../../API'

export const storageName = 'userData'

export const useAuth = () => {
	const [token, setToken] = useState(null)
	const [id, setId] = useState(null)

	const login = useCallback((jwtToken, currentUserId) => {
		setToken(jwtToken)
		setId(currentUserId)
		localStorage.setItem(
			storageName,
			JSON.stringify({
				id: currentUserId,
				token: jwtToken
			})
		)
		instance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
	}, [])

	const logOut = useCallback(() => {
		setToken(null)
		setId(null)

		delete instance.defaults.headers.common['Authorization']

		localStorage.removeItem(storageName)
	}, [])

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName) || '{}')

		if (data && data.token) {
			login(data.token, data.id)
		}
	}, [token, login])

	return { login, logOut, token, id }
}
