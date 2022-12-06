import React from 'react'
import { Button, Header, Icon, Table } from 'semantic-ui-react'
import classes from './ProjectUser.module.css'

const ProjectUserItem = ({ userData, onRemove }) => {
	return (
		<>
			<Table.Row>
				<Table.Cell>
					<Header as="h4" image>
						<button
							className={classes.button}
							onClick={() => onRemove(userData.id)}
						>
							<Icon size="tiny" color="orange" name="remove" />
						</button>
						<Icon name="user circle" />
						<Header.Content>
							{userData.user.firstName} {userData.user.lastName}
							<Header.Subheader>{userData.user.email} </Header.Subheader>
							<Header.Subheader>{userData.role}</Header.Subheader>
						</Header.Content>
					</Header>
				</Table.Cell>
				<Table.Cell>22</Table.Cell>
			</Table.Row>
		</>
	)
}

export default ProjectUserItem
