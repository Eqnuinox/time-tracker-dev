import { UserAPI } from '../API/UsersAPI/UserApi'
import { useCallback } from 'react'
import { instance } from '../API'
import { storageName } from './AuthHooks'

export const useRemoveUsers = () => {
	const remove = useCallback((id) => {
		const { token } = JSON.parse(localStorage.getItem(storageName) || '')
		console.log(token)
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

		UserAPI.removeUser(id).then((r) => {
			return alert('deleted')
		})
	}, [])

	return { remove }
}
