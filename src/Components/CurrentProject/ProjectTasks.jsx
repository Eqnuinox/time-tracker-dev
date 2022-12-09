import React from 'react'
import ProjectTaskItem from './ProjectTaskItem'
import classes from './ProjectUser.module.css'
import { Button, Table } from 'semantic-ui-react'

const ProjectTasks = ({ tasks }) => {
	console.log('from component', tasks)
	return (
		<>
			<div className={classes.tasksBlock}>
				<div className={classes.header}>
					<Button floated="right" positive>
						add new task
					</Button>
					<h3>Tasks list</h3>
				</div>
				<Table>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Status</Table.HeaderCell>
							<Table.HeaderCell>Pinned</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					{tasks.map((item, index) => (
						<ProjectTaskItem task={item} key={index} />
					))}
				</Table>
			</div>
		</>
	)
}

export default ProjectTasks
