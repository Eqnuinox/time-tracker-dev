import { instance } from '../index'

export class UserAPI {
	static getUserData(currentUserId) {
		return instance.get(`/users/${currentUserId}`).then((response) => {
			return response
		})
	}

	static findAllUser([usersIds]) {
		return instance
			.get(
				usersIds
					? `/users?${usersIds.map((id) => `ids=${id}`).join('&')}`
					: '/users'
			)
			.then((response) => {
				return response
			})
	}

	static createUser(email, firstName, lastName, password) {
		return instance
			.post('/users', { email, firstName, lastName, password })
			.then((response) => {
				return response
			})
	}

	static removeUser(id) {
		return instance.delete(`/users/${id}`).then((response) => {
			return response
		})
	}
}
