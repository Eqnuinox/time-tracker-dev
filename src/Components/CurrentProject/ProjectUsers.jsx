import React from 'react'
import classes from './ProjectUser.module.css'
import ProjectUserItem from './ProjectUserItem'
import { Table } from 'semantic-ui-react'

const ProjectUsers = ({ project = [], onRemove }) => {
	return (
		<div>
			{!project.length ? (
				<h1>Project users not found </h1>
			) : (
				<div className={classes.user_list}>
					<Table basic="very" celled collapsing>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Users on Project</Table.HeaderCell>
								<Table.HeaderCell>Tasks</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{project.map((item, index) => (
								<ProjectUserItem
									key={index}
									userData={item}
									onRemove={onRemove}
								/>
							))}
						</Table.Body>
					</Table>
				</div>
			)}
		</div>
	)
}

export default ProjectUsers
