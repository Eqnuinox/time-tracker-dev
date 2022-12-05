import React from 'react'
import ProjectList from '../../../Components/ProjectController/projectList'
import classes from './ProjectController.module.css'

const ProjectController = () => {
	return (
		<div className={classes.container}>
			<ProjectList />
		</div>
	)
}

export default ProjectController
