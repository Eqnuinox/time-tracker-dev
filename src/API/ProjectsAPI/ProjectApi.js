import { instance } from '../index'

export class ProjectApi {
	static findAllProject() {
		return instance.get('/projects').then((response) => {
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
}

//ttadmin@esoftx.com
//w;cyOz5Z^YD
