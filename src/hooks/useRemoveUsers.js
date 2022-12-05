import { UserAPI } from '../API/UsersAPI/UserApi'
import { useCallback, useState } from 'react'
import { instance } from '../API'
import { storageName } from './AuthHooks'
import { useDispatch } from 'react-redux'
import { removeUser } from '../Redux/Slices/userControlSlices/findAllUsersSlice'

export const useRemoveUsers = () => {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()

	const remove = useCallback((id) => {
		if (id === 1) {
			alert('You cannot delete admin user')
			return
		}
		setLoading(true)
		const { token } = JSON.parse(localStorage.getItem(storageName) || '')
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
		UserAPI.removeUser(id).then((r) => {
			dispatch(removeUser(id))
			setLoading(false)
		})
	}, [])

	return { remove, loading }
}
