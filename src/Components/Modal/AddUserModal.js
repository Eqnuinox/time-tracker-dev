import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import AuthForm from '../AuthForm/AuthForm'
import { createUsers } from '../../Redux/Slices/userControlSlices/createUserSlice'
import { storageName } from '../../hooks/AuthHooks'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const AddUserModal = () => {
	const { token } = JSON.parse(localStorage.getItem(storageName) || '{}')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleAddUser = (userEmail, userPassword, name, lastName) => {
		const newUserData = {
			email: userEmail,
			password: userPassword,
			firstName: name,
			lastName: lastName
		}
		dispatch(createUsers([token, { newUserData }])).then((response) => {
			navigate('/admin/user-controller', { replace: true })
		})
	}

	return (
		<>
			<Modal.Header>Create User</Modal.Header>
			<Modal.Content>
				<AuthForm handleSubmit={handleAddUser} isSingUp={true} />
			</Modal.Content>
		</>
	)
}
