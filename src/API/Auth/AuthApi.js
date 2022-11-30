import { instance } from '../index'

export class AuthAPI {
	static login(email, password) {
		return instance.post('/login', { email, password }).then((response) => {
			return response
		})
	}
}

//ttadmin@esoftx.com
//w;cyOz5Z^YD
