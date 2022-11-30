import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AuthContext } from '../../Context/Context'
import { fetchUser } from '../../Redux/Slices/authSlice'
import classes from './AuthAdmin.module.css'
import AuthForm from '../../Components/AuthForm/AuthForm'

const AuthAdmin = () => {
	const dispatch = useDispatch()
	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const handleOnSubmit = (userEmail, userPassword) => {
		dispatch(fetchUser([userEmail, userPassword])).then((response) => {
			const {
				token,
				user: { id }
			} = response.payload
			try {
				auth.login(token, id)
				navigate(`/admin`, { replace: true })
			} catch (e) {}
		})
	}

	return (
		<>
			<div className={classes.auth_container}>
				<h2 className="ui icon header">
					<i className="sign in icon" />
					<div className="content">
						Sign in
						<div className="sub header">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						</div>
					</div>
				</h2>
				<AuthForm handleSubmit={handleOnSubmit} />
			</div>
		</>
	)
}

export default AuthAdmin
