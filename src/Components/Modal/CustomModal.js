import React, { useEffect, useState } from 'react'
import { Modal } from 'semantic-ui-react'
import AuthForm from '../AuthForm/AuthForm'
import { useDispatch, useSelector } from 'react-redux'

export const CustomModal = ({ handleCustom, name, id = null }) => {
	const project = useSelector((state) => state.projects.data)
	const currentUser = project.filter((project) => project.id === id)

	return (
		<>
			<Modal.Content>
				{name === 'create' && <h1>Create new project</h1>}
				{name === 'update' && (
					<>
						<h1>Update project</h1>
						<h3>ID:{currentUser[0].id}</h3>
						<h3>Name:{currentUser[0].name}</h3>
						<h3>Description:{currentUser[0].description}</h3>
						<h3>Customer:{currentUser[0].customer}</h3>
					</>
				)}
				<AuthForm createNew={true} handleSubmit={handleCustom} />
			</Modal.Content>
		</>
	)
}
