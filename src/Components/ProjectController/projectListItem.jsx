import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import classes from './ProjectList.module.css'

const ProjectListItem = ({ projects, onRemove, onUpdate }) => {
	return (
		<>
			<Link to={`/admin/${projects.id}`}>
				<Card className={classes.card}>
					<Card.Content>
						<Image
							floated="right"
							size="mini"
							src="/images/avatar/large/steve.jpg"
						/>
						<Card.Header>{projects.name}</Card.Header>
						<Card.Meta>{projects.customer}</Card.Meta>
						<Card.Meta>{projects.id}</Card.Meta>
						<Card.Description>{projects.description}</Card.Description>
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
			</Link>
		</>
	)
}

export default ProjectListItem
