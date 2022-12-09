import React from 'react'
import { Icon, Table } from 'semantic-ui-react'

const ProjectTaskItem = ({ task }) => {
	let rowStatus =
		task.status === 'OPEN'
			? ''
			: task.status === 'IN_PROGRESS'
			? 'warning'
			: task.status === 'DONE'
			? 'positive'
			: 'negative'

	console.log(task)
	return (
		<>
			<Table.Body>
				<Table.Row className={rowStatus}>
					<Table.Cell>{task.name}</Table.Cell>
					<Table.Cell>
						{task.status === 'DONE' && <Icon name="checkmark" />}
						{task.status}
					</Table.Cell>
					<Table.Cell negative>{task.pinned}sadasd</Table.Cell>
				</Table.Row>
			</Table.Body>
		</>
	)
}

export default ProjectTaskItem
