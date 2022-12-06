import { ProjectApi } from '../API/ProjectsAPI/ProjectApi'
import { instance } from '../API'
import { token } from '../Shared/tokenApi'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { logDOM } from '@testing-library/react'

export const useCurrentProject = (id) => {
	instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
	const [data, setData] = useState()
	const [success, setSuccess] = useState()

	useEffect(() => {
		ProjectApi.findUsersOfProject(id).then((response) => {
			setData(response.data.response)
			setSuccess(response.data.success)
		})
	}, [])

	const registerUserInProject = (userId, role) => {
		ProjectApi.addUserInProject(userId, id, role).then((response) => {})
	}

	return { registerUserInProject, data, success }
}
