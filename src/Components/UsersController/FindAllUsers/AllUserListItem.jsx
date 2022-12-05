import React, { useCallback, useState } from 'react'
import classes from './AllUserListItem.module.css'
import { Button, Confirm } from 'semantic-ui-react'
import { useRemoveUsers } from '../../../hooks/useRemoveUsers'

const AllUsersListItem = ({ users }) => {
	const { remove, loading } = useRemoveUsers()
	let toggleProcess = loading ? 'loading' : ''
	let toggleDisabled = users.id === 1 && 'disabled'
	const handleRemoveUser = useCallback(() => {
		remove(users.id)
	}, [])

	return (
		<div className={classes.user_listItem}>
			<div className={classes.userId}>
				<div className={classes.idRole}>{users.id}</div>
			</div>
			<div className={classes.user_PrData}>
				<span>Name: {users.firstName}</span>
				<span>Last name:{users.lastName}</span>
			</div>
			<div className={classes.grid_conf}>{users.email}</div>
			<Button.Group>
				<Button>Update</Button>
				<Button.Or />
				<Button
					className={`${toggleProcess} ${toggleDisabled}`}
					negative
					onClick={handleRemoveUser}
				>
					Remove
				</Button>
			</Button.Group>
		</div>
	)
}

export default AllUsersListItem
