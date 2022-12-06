import React, { useCallback, useEffect, useState } from 'react'
import { ProjectApi } from '../API/ProjectsAPI/ProjectApi'

export const useProjectUser = (projectId, id = '') => {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [usersOfProject, setUsersOfProject] = useState([])

	useEffect(() => {
		setIsLoading(true)
		ProjectApi.findProjectUsers(id).then((response) => {
			if (response.data.success) {
				setData(response.data.response)
				if (projectId) {
					const usersOfCurrentProject = response.data.response.filter(
						(x) => x.project.id.toString() === projectId
					)
					setUsersOfProject(usersOfCurrentProject)
					console.log(usersOfCurrentProject)
				}
			}
			setIsLoading(false)
		})
	}, [])

	const removeProjectUser = useCallback((id) => {
		ProjectApi.removeProjectUsersById(id).then((response) => {
			if (response.status === 204) {
				alert('Successful')
			}
		})
	}, [])

	return { data, isLoading, usersOfProject, removeProjectUser }
}
