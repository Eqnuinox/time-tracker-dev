import React from 'react'
import AllUsersListItem from './AllUserListItem'
import { useSelector } from 'react-redux'
import { useAllUsers } from '../../../hooks/useAllUsers'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const AllUsersList = () => {
	const { status } = useAllUsers()
	const users = useSelector((state) => state.findAllUsers.data)
	try {
		return (
			<div>
				{status === 'pending' ? (
					<Segment>
						<Dimmer active inverted>
							<Loader inverted>Loading</Loader>
						</Dimmer>
					</Segment>
				) : (
					users.map((id, key) => <AllUsersListItem users={id} key={key} />)
				)}
			</div>
		)
	} catch (e) {
		console.log(e)
	}
}

export default AllUsersList
