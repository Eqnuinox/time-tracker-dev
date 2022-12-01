import React, { useState } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'
import AllUsersList from '../../../Components/UsersController/FindAllUsers/AllUsersList'
import classes from './UserController.module.css'
import { AddUserModal } from '../../../Components/Modal/AddUserModal'

const UserControllerPage = () => {
	const [open, setOpen] = useState()
	const handleOpenState = (open) => {
		setOpen(false)
	}

	return (
		<>
			<div className={classes.container}>
				<div className={classes.user_listItem}>
					<div className={classes.usrId}>
						<span>ID</span>
					</div>
					<div className={classes.user_PrData}>
						<span>USERNAME</span>
					</div>
					<div className={classes.grid_conf}>email</div>
					<Button.Group>
						<Modal
							onClose={() => setOpen(false)}
							onOpen={() => setOpen(true)}
							open={open}
							trigger={
								<Button positive>
									<Icon name="add user" />
									Add
								</Button>
							}
						>
							<Modal.Header>Create new user</Modal.Header>
							<Modal.Content>
								<AddUserModal handleSubmit={handleOpenState} />
							</Modal.Content>
						</Modal>
					</Button.Group>
				</div>
				<AllUsersList />
			</div>
		</>
	)
}

export default UserControllerPage
