import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import classes from './ProjectList.module.css'

const ProjectListItem = ({ projects, onRemove, onUpdate }) => {
	return (
		<>
			<Card className={classes.card}>
				<Card.Content>
					<Link to={`/admin/${projects.id}`}>
						<Icon
							style={{ float: 'right' }}
							corner="bottom left"
							size="big"
							name="list alternate outline"
						/>
						<Card.Header>{projects.name}</Card.Header>
						<Card.Meta>{projects.customer}</Card.Meta>
						<Card.Meta>{projects.id}</Card.Meta>
						<Card.Description>{projects.description}</Card.Description>
					</Link>
				</Card.Content>
				<Card.Content extra>
					<div className="ui two buttons">
						<Button onClick={() => onUpdate(projects.id)} color="green">
							Approve
						</Button>
						<Button onClick={() => onRemove(projects.id)} color="red">
							Decline
						</Button>
					</div>
				</Card.Content>
			</Card>
		</>
	)
}

export default ProjectListItem
