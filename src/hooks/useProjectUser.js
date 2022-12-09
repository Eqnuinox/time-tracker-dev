import { useCallback, useEffect, useState } from 'react'
import { ProjectApi } from '../API/ProjectsAPI/ProjectApi'
import { useDispatch, useSelector } from 'react-redux'
import {
	addUserInProject,
	findAllProjectUserSlice,
	removeUserFromProject
} from '../Redux/Slices/projectControllSlices/allProjectUsers'
import { findAllTasksSlice } from '../Redux/Slices/projectControllSlices/allTasksSlice'

export const useProjectUser = (projectId) => {
	const [filteredData, setFilteredData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState({})
	const [success, setSuccess] = useState()
	const [filteredTasks, setFilteredTasks] = useState([])

	const dispatch = useDispatch()
	const { data, status } = useSelector((state) => state.usersOnProject)
	const { data: tasks, status: taskStatus } = useSelector(
		(state) => state.projectTasks
	)

	useEffect(() => {
		dispatch(findAllProjectUserSlice(projectId))
		dispatch(findAllTasksSlice())

		const filter = data.filter(
			(item) => item.project.id.toString() === projectId
		)
		const tasksFilter = tasks.filter(
			(item) => item.project.id.toString() === projectId
		)
		setFilteredTasks(tasksFilter)
		setFilteredData(filter)
		//eslint-disable-next-line
	}, [isLoading])

	const removeProjectUser = useCallback((id) => {
		setIsLoading(true)

		ProjectApi.removeProjectUsersById(id).then((response) => {
			if (response.status === 204) {
				dispatch(removeUserFromProject(id))
				alert('Successful')
			}
			setIsLoading(false)
		})
		//eslint-disable-next-line
	}, [])

	const registerUserInProject = useCallback((userId, role) => {
		setIsLoading(true)
		if (filteredData.some((item) => item.user.id === userId)) {
			setError({ error: true, message: 'That user already on a project' })
			setIsLoading(false)
			return
		}
		ProjectApi.addUserInProject(userId, projectId, role).then((response) => {
			if (response.data.success) {
				setSuccess(true)
				setIsLoading(false)
				dispatch(addUserInProject(response.data.response))
			}
		})
		//eslint-disable-next-line
	}, [])

	return {
		registerUserInProject,
		filteredData,
		filteredTasks,
		status,
		success,
		error,
		isLoading,
		removeProjectUser
	}
}
