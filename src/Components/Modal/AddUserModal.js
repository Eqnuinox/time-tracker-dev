import React from 'react'
import { Modal } from 'semantic-ui-react'
import AuthForm from '../AuthForm/AuthForm'
import { createUsers } from '../../Redux/Slices/userControlSlices/createUserSlice'
import { storageName } from '../../hooks/AuthHooks'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../Redux/Slices/userControlSlices/findAllUsersSlice'

export const AddUserModal = ({ handleSubmit }) => {
	const { token } = JSON.parse(localStorage.getItem(storageName) || '{}')

	const statusSelector = useSelector((state) => state.createUser.status)
	const dispatch = useDispatch()

	const handleAddUser = (userEmail, userPassword, name, lastName) => {
		const newUserData = {
			email: userEmail,
			password: userPassword,
			firstName: name,
			lastName: lastName
		}
		dispatch(createUsers([token, { newUserData }])).then(
			({ payload: { response } }) => {
				handleSubmit(false)
				dispatch(addUser(response))
			}
		)
	}

	return (
		<>
			<Modal.Content>
				<AuthForm
					handleSubmit={handleAddUser}
					isSingUp={true}
					statusSelector={statusSelector}
				/>
			</Modal.Content>
		</>
	)
}
