import React, { useEffect, useState } from 'react'
import ProjectListItem from './projectListItem'
import { useAllProjects } from '../../hooks/useAllProjects'
import {
	Button,
	Icon,
	Card,
	Modal,
	Dimmer,
	Loader,
	Segment
} from 'semantic-ui-react'
import classes from './ProjectList.module.css'
import { CustomModal } from '../Modal/CustomModal'

const ProjectList = () => {
	const [open, setOpen] = useState(false)
	const [id, setId] = useState({})
	const [isUpdating, setIsUpdating] = useState(true)

	const projects = useAllProjects()

	const handleCreateProject = ({ name, description, customer }) => {
		projects.createNewProject(name, description, customer)
	}

	const handleRemoveProject = (id) => {
		projects.removeProject(id)
	}

	const handleUpdateProject = ({ name, description, customer }) => {
		projects.updateProject(id.id, name, description, customer)
	}

	return (
		<div className={classes.container}>
			<Modal
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				trigger={
					<Button
						onClick={() => setIsUpdating(false)}
						className={classes.button}
						positive
					>
						<Icon name="add to calendar" />
						Add new project
					</Button>
				}
			>
				<Modal.Header>Create new</Modal.Header>
				<Modal.Content>
					{!isUpdating ? (
						<CustomModal name={'create'} handleCustom={handleCreateProject} />
					) : (
						<CustomModal
							name={'update'}
							id={id.id}
							handleCustom={handleUpdateProject}
						/>
					)}
				</Modal.Content>
			</Modal>
			<Card.Group>
				{projects.status === 'pending' ? (
					<Segment className={classes.container}>
						<Dimmer active inverted>
							<Loader size={'massive'}>Loading...</Loader>
						</Dimmer>
					</Segment>
				) : (
					projects.data.map((id, key) => (
						<ProjectListItem
							key={key}
							projects={id}
							onRemove={handleRemoveProject}
							onUpdate={() => {
								setId(id)
								setIsUpdating(true)
								setOpen(true)
							}}
						/>
					))
				)}
			</Card.Group>
		</div>
	)
}

export default ProjectList
