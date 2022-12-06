import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAllProjects } from '../../../hooks/useAllProjects'
import { useCurrentProject } from '../../../hooks/useCurrentProject'
import ProjectUsers from '../../../Components/CurrentProject/ProjectUsers'
import { Button, Icon, Modal } from 'semantic-ui-react'
import classes from './CurrentProjectPage.module.css'
import CustomList from '../../../Components/Modal/CustomList'
import { useProjectUser } from '../../../hooks/useProjectUser'

const CurrentProjectPage = () => {
	const [open, setOpen] = useState()
	const { id } = useParams()
	const { data: projectList } = useAllProjects()
	const currentProject = projectList.find((x) => x.id.toString() === id)
	const project = useCurrentProject(id)
	const { usersOfProject, removeProjectUser } = useProjectUser(id)
	const [role, setRole] = useState('DEVELOPER')

	const handleChooseRole = useCallback((e, { value }) => {
		setRole(value)
	}, [])

	const handleRegisterUserOnProject = useCallback(
		(userId) => {
			project.registerUserInProject(userId, role)
		},
		[role]
	)

	return (
		<>
			<div className={classes.container}>
				<div className={classes.header}>
					<div className={classes.headerInside}>
						<Button positive onClick={() => setOpen(true)}>
							<Icon name="add user" />
							Register new user
						</Button>
						<div>
							<div>
								<span>Project name: </span> {currentProject.name}
							</div>
							<div>
								<span>Customer: </span> {currentProject.customer}
							</div>
						</div>
					</div>
					<div className={classes.self}>{currentProject.description}</div>
				</div>
				<ProjectUsers project={usersOfProject} onRemove={removeProjectUser} />
			</div>
			<Modal
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
			>
				<Modal.Header>Create new</Modal.Header>
				<Modal.Content>
					<CustomList
						role={role}
						onChooseRole={handleChooseRole}
						onRegisterUser={handleRegisterUserOnProject}
						tittle={`Register user on ${currentProject.name} project`}
					/>
				</Modal.Content>
			</Modal>
		</>
	)
}

export default CurrentProjectPage
