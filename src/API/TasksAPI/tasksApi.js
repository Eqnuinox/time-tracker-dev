import { instance } from '../index'

export class TasksApi {
	static findAllTasks(id) {
		return instance
			.get(id !== '' ? `/tasks/${id}` : '/tasks')
			.then((response) => {
				return response
			})
	}
}
