import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import AuthForm from '../AuthForm/AuthForm'
import { createUsers } from '../../Redux/Slices/userControlSlices/createUserSlice'
import { storageName } from '../../hooks/AuthHooks'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../Redux/Slices/userControlSlices/findAllUsersSlice'
import { useAllUsers } from '../../hooks/useAllUsers'

export const AddUserModal = ({ handleSubmit }) => {
	const { token } = JSON.parse(localStorage.getItem(storageName) || '{}')

	const statusSelector = useSelector((state) => state.createUser.status)
	const dispatch = useDispatch()
	const { users } = useAllUsers()
	const [emailExist, setEmailExist] = useState(false)

	const handleAddUser = ({ email, password, name, lastName }) => {
		const newUserData = {
			email: email,
			password: password,
			firstName: name,
			lastName: lastName
		}
		if (users.filter((users) => users.email === email).length) {
			setEmailExist(true)
			return
		}

		console.log(newUserData.firstName)

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
					isEmailExist={emailExist}
				/>
			</Modal.Content>
		</>
	)
}
