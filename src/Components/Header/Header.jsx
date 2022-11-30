// noinspection CheckTagEmptyBody

import React, { useContext, useEffect } from 'react'
import { storageName } from '../../hooks/AuthHooks'
import { AuthContext } from '../../Context/Context'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../Redux/Slices/userSlice'
import classes from './Header.module.css'
import { removeUser } from '../../Redux/Slices/authSlice'

const Header = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const dispatch = useDispatch()
	const { applicationRole, email, firstName } = useSelector(
		(state) => state.getCurrentUserData
	)

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))
		dispatch(getCurrentUser([data.id, data.token]))
		// eslint-disable-next-line
	}, [])

	const handleLogOut = () => {
		dispatch(removeUser())
		auth.logOut()
		navigate(`/auth-admin/`)
	}

	return (
		<div className={`ui clearing segment ${classes.container}`}>
			<div className={`ui left floated header ${classes.header_appRole}`}>
				<h2 className="ui header">
					<i className={`user circle icon`}>
						<p>{applicationRole}</p>
					</i>

					<div className="content">
						{firstName}
						<div className="sub header">{email}</div>
					</div>
				</h2>
			</div>
			<div className={'ui right floated header'}>
				<button className={'ui basic button'} onClick={handleLogOut}>
					<i className={'icon logout'} />
					<span>logOut</span>
				</button>
			</div>
		</div>
	)
}

export default Header
