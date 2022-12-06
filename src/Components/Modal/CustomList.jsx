import React, { useState } from 'react'
import AllUsersList from '../UsersController/FindAllUsers/AllUsersList'
import { Form } from 'semantic-ui-react'

const CustomList = ({ onRegisterUser, tittle = '', onChooseRole, role }) => {
	return (
		<>
			<h2>{tittle}</h2>
			<Form>
				<Form.Group inline>
					<Form.Radio
						label="Developer"
						value="DEVELOPER"
						checked={role === 'DEVELOPER'}
						onChange={onChooseRole}
					/>
					<Form.Radio
						label="Team lead"
						value="TEAM_LEAD"
						checked={role === 'TEAM_LEAD'}
						onChange={onChooseRole}
					/>{' '}
					<Form.Radio
						label="Project Manager"
						value="PROJECT_MANAGER"
						checked={role === 'PROJECT_MANAGER'}
						onChange={onChooseRole}
					/>
					<Form.Radio
						label="Accountant"
						value="ACCOUNTANT"
						checked={role === 'ACCOUNTANT'}
						onChange={onChooseRole}
					/>
				</Form.Group>
			</Form>
			<AllUsersList onRegisterUser={onRegisterUser} registerUser={true} />
		</>
	)
}

//DEVELOPER, TEAM_LEAD, PROJECT_MANAGER, ACCOUNTANT

export default CustomList
