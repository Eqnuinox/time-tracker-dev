import { useEffect, useState } from 'react'
import { findAllUsersSlice } from '../Redux/Slices/userControlSlices/findAllUsersSlice'
import { useDispatch, useSelector } from 'react-redux'

export const storageName = 'userData'

export const useAllUsers = ([usersIds] = []) => {
	const dispatch = useDispatch()
	const token = JSON.parse(localStorage.getItem(storageName)).token
	const { status } = useSelector((sate) => sate.createUser)
	const data = useSelector((sate) => sate.findAllUsers.data)
	const [users, setUsers] = useState([])

	useEffect(() => {
		dispatch(findAllUsersSlice([token, [usersIds]]))
		setUsers(data)
		// eslint-disable-next-line
	}, [status])

	return { users, status }
}
