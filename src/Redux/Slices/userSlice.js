import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserAPI } from '../../API/UsersAPI/UserApi'
import { instance } from '../../API'

const initialState = {
	applicationRole: null,
	firstName: null,
	lastName: null,
	email: null,
	status: null,
	error: null
}

export const getCurrentUser = createAsyncThunk(
	'admin/getCurrentUser',
	async function ([CurrentUserId, currentUserToken]) {
		instance.defaults.headers.common[
			'Authorization'
		] = `Bearer ${currentUserToken}`
		const response = await UserAPI.getUserData(CurrentUserId)
		const data = await response.data
		return data.response
	}
)

const getCurrentUserDataSlice = createSlice({
	name: 'admin',
	initialState,
	extraReducers: {
		[getCurrentUser.pending]: (state) => {
			state.status = 'pending'
			state.error = null
		},
		[getCurrentUser.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.email = action.payload.email
			state.applicationRole = action.payload.applicationRole
			state.firstName = action.payload.firstName
			state.lastName = action.payload.lastName
		},
		[getCurrentUser.rejected]: (state, action) => {}
	}
})

export default getCurrentUserDataSlice.reducer
