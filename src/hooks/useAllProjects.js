import { useDispatch, useSelector } from 'react-redux'
import {
	addProject,
	findAllProjectsSlice,
	removeProjectById,
	updateProjectById
} from '../Redux/Slices/projectControllSlices/allProgectSlice'
import { token } from '../Shared/tokenApi'
import { ProjectApi } from '../API/ProjectsAPI/ProjectApi'
import { useCallback, useEffect, useState } from 'react'

export const useAllProjects = (callback, deps) => {
	const [isLoading, setIsLoading] = useState(false)

	const dispatch = useDispatch()
	const { status, data } = useSelector((state) => state.projects)

	useEffect(() => {
		dispatch(findAllProjectsSlice([token]))
	}, [])

	const createNewProject = (name, description, customer) => {
		ProjectApi.createProject(name, description, customer).then((response) => {
			console.log(response.data)
			if (response.data.success) {
				const projectData = {
					id: response.data.response.id,
					name: name,
					description: description,
					customer: customer
				}
				dispatch(addProject(projectData))
				alert(`Project ${name} successfully created!`)
			}
		})
	}

	const removeProject = useCallback((id) => {
		setIsLoading(true)
		ProjectApi.deleteProject(id).then((response) => {
			setIsLoading(false)
			console.log(response)
			if (response.status === 204) {
				dispatch(removeProjectById(id))
				alert(`Project successfully deleted`)
			} else {
				alert('error')
			}
		})
	}, [])

	const updateProject = useCallback((id, name, description, customer) => {
		setIsLoading(true)
		ProjectApi.updateProject(id, name, description, customer).then((r) => {
			setIsLoading(false)
			if (r.data.success) {
				dispatch(updateProjectById({ id, name, description, customer }))
			}
		})
	}, [])

	return {
		createNewProject,
		status,
		data,
		removeProject,
		isLoading,
		updateProject
	}
}
