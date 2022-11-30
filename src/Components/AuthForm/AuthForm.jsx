import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Form, Input, Label } from 'semantic-ui-react'
import classes from './AuthForm.module.css'
import usePasswordToggle from '../../hooks/usePasswordToggle'

const AuthForm = ({ handleSubmit, isSingUp = false }) => {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [lastName, setLastName] = useState('')
	const [password, setPassword] = useState('')
	const [passwordInputType, toggleIcon] = usePasswordToggle()

	const statusSelector = useSelector((state) => state.auth.status)

	let toggleLoadingCheck = statusSelector === 'pending' ? 'loading' : ''
	let toggleErrorCheck = statusSelector === 'rejected' ? 'error' : ''

	return (
		<Form onSubmit={() => handleSubmit(email, password, name, lastName)}>
			<Form.Field className={`${toggleErrorCheck}`}>
				<input
					placeholder="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</Form.Field>
			<Form.Field className={`${toggleErrorCheck}`}>
				<Input
					placeholder="password"
					type={passwordInputType}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<span className={classes.passwordToggleIcon}>{toggleIcon}</span>
				{statusSelector === 'rejected' ? (
					<Label className={classes.err_label} pointing prompt>
						invalid Email or Password
					</Label>
				) : (
					''
				)}
			</Form.Field>
			{isSingUp && (
				<Form.Field className={`${toggleErrorCheck}`}>
					<input
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Field>
			)}
			{isSingUp && (
				<Form.Field className={`${toggleErrorCheck}`}>
					<input
						placeholder="Last name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</Form.Field>
			)}
			<Button className={`${toggleLoadingCheck}`} content="Submit" />
		</Form>
	)
}

export default AuthForm
