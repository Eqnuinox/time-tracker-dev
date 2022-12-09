import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAllProjects } from '../../../hooks/useAllProjects'
import ProjectUsers from '../../../Components/CurrentProject/ProjectUsers'
import { Button, Icon, Modal } from 'semantic-ui-react'
import classes from './CurrentProjectPage.module.css'
import CustomList from '../../../Components/Modal/CustomList'
import { useProjectUser } from '../../../hooks/useProjectUser'
import ProjectTasks from '../../../Components/CurrentProject/ProjectTasks'

const CurrentProjectPage = () => {
	const { id } = useParams()

	const [open, setOpen] = useState()
	const [role, setRole] = useState('DEVELOPER')

	const { data: projectList } = useAllProjects()

	const currentProject = projectList.find((x) => x.id.toString() === id)

	const {
		filteredData: usersOfProject,
		error,
		success,
		registerUserInProject,
		removeProjectUser,
		filteredTasks
	} = useProjectUser(id)

	const handleChooseRole = useCallback((e, { value }) => {
		setRole(value)
	}, [])

	const handleRegisterUserOnProject = useCallback(
		(userId) => {
			if (success) {
				setOpen(false)
			}
			registerUserInProject(userId, role)
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
				<div className={classes.content}>
					<ProjectUsers project={usersOfProject} onRemove={removeProjectUser} />
					<ProjectTasks tasks={filteredTasks} />
				</div>
			</div>
			<Modal
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
			>
				<Modal.Header>Create new</Modal.Header>
				<Modal.Content>
					<CustomList
						error={error}
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
