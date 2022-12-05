import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Form, Input, Label } from 'semantic-ui-react'
import classes from './AuthForm.module.css'
import { usePasswordToggle } from '../../hooks/usePasswordToggle'

const AuthForm = ({
	handleSubmit,
	isSingUp = false,
	statusSelector,
	isEmailExist = false,
	createNew = false
}) => {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [lastName, setLastName] = useState('')
	const [password, setPassword] = useState('')
	const [description, setDescription] = useState('')
	const [customer, setCustomer] = useState('')
	const [passwordInputType, toggleIcon] = usePasswordToggle()

	let toggleLoadingCheck = statusSelector === 'pending' ? 'loading' : ''
	let toggleErrorCheck = statusSelector === 'rejected' ? 'error' : ''

	const formData = {
		email,
		password,
		name,
		lastName,
		description,
		customer
	}

	return (
		<Form className={classes.form} onSubmit={() => handleSubmit(formData)}>
			{isEmailExist && (
				<Label className={classes.err_label} pointing="below" color="red">
					This email already exist
				</Label>
			)}
			{statusSelector === 'rejected' ? (
				<Label className={classes.err_label} pointing="below" color="red">
					invalid Email or Password
				</Label>
			) : (
				''
			)}

			{!createNew && (
				<>
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
					</Form.Field>
				</>
			)}

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

			{createNew && (
				<>
					<Form.Field className={`${toggleErrorCheck}`}>
						<input
							placeholder="Project name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Field>
					<Form.Field className={`${toggleErrorCheck}`}>
						<input
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Form.Field>
					<Form.Field className={`${toggleErrorCheck}`}>
						<input
							placeholder="Customer"
							value={customer}
							onChange={(e) => setCustomer(e.target.value)}
						/>
					</Form.Field>
				</>
			)}

			<Button className={`${toggleLoadingCheck}`} content="Submit" />
		</Form>
	)
}

export default AuthForm
