import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './Slices/authSlice'
import getCurrentUserDataReducer from './Slices/userSlice'
import storage from 'redux-persist/lib/storage'
import getAllUsersReducer from './Slices/userControlSlices/findAllUsersSlice'
import getCreateUserReducer from './Slices/userControlSlices/createUserSlice'
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist'

const rootReducer = combineReducers({
	auth: authReducer,
	getCurrentUserData: getCurrentUserDataReducer,
	findAllUsers: getAllUsersReducer,
	createUser: getCreateUserReducer
})

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['auth', 'getCurrentUserData', 'createUsers', 'findAllUsers']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				// Ignore these field paths in all actions
				ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
				// Ignore these paths in the state
				ignoredPaths: ['items.dates']
			}
		})
})

export const persistor = persistStore(store)
export default store
