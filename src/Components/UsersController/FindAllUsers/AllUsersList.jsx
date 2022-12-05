import React, { useEffect, useState } from 'react'
import AllUsersListItem from './AllUserListItem'
import { useSelector } from 'react-redux'
import { useAllUsers } from '../../../hooks/useAllUsers'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import Search from '../../Search/Search'
import { clear } from '@testing-library/user-event/dist/clear'

const filter = (search, usersList) => {
	if (!search) {
		return usersList
	}
	return usersList.filter((usersList) =>
		usersList.firstName.toLowerCase().includes(search.toLowerCase())
	)
}

const AllUsersList = () => {
	const { status } = useAllUsers()
	const users = useSelector((state) => state.findAllUsers.data)
	const [filteredUsers, setFilteredUsers] = useState([])
	const [searchText, setSearchText] = useState('')

	useEffect(() => {
		const Debounce = setTimeout(() => {
			const temp = filter(searchText, users)
			setFilteredUsers(temp)
		}, 300)

		return () => clearTimeout(Debounce)
	}, [searchText, users])

	try {
		return (
			<div>
				<input
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					type="text"
				/>{' '}
				<label htmlFor="input"> search</label>
				{status === 'pending' ? (
					<Segment>
						<Dimmer active inverted>
							<Loader size={'massive'}>Loading</Loader>
						</Dimmer>
					</Segment>
				) : (
					filteredUsers.map((id, key) => (
						<AllUsersListItem users={id} key={key} />
					))
				)}
			</div>
		)
	} catch (e) {
		console.log(e)
	}
}

export default AllUsersList
