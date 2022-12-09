import { instance } from '../index'

export class ProjectApi {
	static findAllProject(id) {
		return instance
			.get(id ? `/projects/${id}` : '/projects')
			.then((response) => {
				return response
			})
	}
	static createProject(name, description, customer) {
		return instance
			.post('/projects', { name, description, customer })
			.then((response) => {
				return response
			})
	}
	static updateProject(id, name, description, customer) {
		return instance
			.patch('/projects', { id, name, description, customer })
			.then((response) => {
				return response
			})
	}

	static findProjectById(id) {
		return instance.get(`/projects/${id}`).then((response) => {
			return response
		})
	}

	static deleteProject(id) {
		return instance.delete(`/projects/${id}`).then((response) => {
			return response
		})
	}

	static findUsersOfProject(id) {
		return instance.get(`/project-users/project/${id}`).then((response) => {
			return response
		})
	}

	static addUserInProject(userId, projectId, role) {
		return instance
			.post(`/project-users`, { userId, projectId, role })
			.then((response) => {
				return response
			})
	}

	static findProjectUsers(id = '') {
		return instance
			.get(id ? `/project-users` : `/project-users/${id}`)
			.then((response) => {
				return response
			})
	}

	static removeProjectUsersById(id) {
		return instance.delete(`/project-users/${id}`).then((response) => {
			return response
		})
	}
}

//ttadmin@esoftx.com
//w;cyOz5Z^YD
