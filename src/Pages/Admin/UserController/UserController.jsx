import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'
import AllUsersList from '../../../Components/UsersController/FindAllUsers/AllUsersList'
import classes from './UserController.module.css'
import { AddUserModal } from '../../../Components/Modal/AddUserModal'

const UserControllerPage = () => {
	function exampleReducer(state, action) {
		switch (action.type) {
			case 'OPEN_MODAL':
				return { open: true, dimmer: action.dimmer }
			case 'CLOSE_MODAL':
				return { open: false }
			default:
				throw new Error()
		}
	}

	const [state, dispatch] = React.useReducer(exampleReducer, {
		open: false,
		dimmer: undefined
	})
	const { open, dimmer } = state

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
						<Button
							positive
							size={'mini'}
							onClick={() =>
								dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })
							}
						>
							<Icon name={'add'} />
							Add
						</Button>
					</Button.Group>
				</div>
				<AllUsersList />

				<Modal
					dimmer={dimmer}
					open={open}
					onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
				>
					<AddUserModal />
				</Modal>
			</div>
		</>
	)
}

export default UserControllerPage
