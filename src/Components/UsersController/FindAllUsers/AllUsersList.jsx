import React from 'react'
import AllUsersListItem from './AllUserListItem'
import { useAllUsers } from '../../../hooks/useAllUsers'
import { useSelector } from 'react-redux'

const AllUsersList = () => {
	const { status } = useSelector((state) => state.createUser)

	const { users } = useAllUsers()
	try {
		return (
			<div>
				{status === 'pending' ? (
					<h1>Loading</h1>
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
