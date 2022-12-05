import { storageName } from '../hooks/AuthHooks'

const AuthData = JSON.parse(localStorage.getItem(storageName) || '{}')

export const token = AuthData.token
