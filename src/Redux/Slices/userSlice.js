import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserAPI } from '../../API/UsersAPI/UserApi'
import { instance } from '../../API'
import { useAuth } from '../../hooks/AuthHooks'

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
	async function ([CurrentUserId, currentUserToken], { rejectWithValue }) {
		try {
			instance.defaults.headers.common[
				'Authorization'
			] = `Bearer ${currentUserToken}`
			const response = await UserAPI.getUserData(CurrentUserId)

			if (response.status !== 200) {
				delete instance.defaults.headers.common['Authorization']
				throw new Error('unauth')
			}
			const data = await response.data

			return data.response
		} catch (e) {
			rejectWithValue(e)
		}
	}
)

const getCurrentUserDataSlice = createSlice({
	name: 'admin',
	initialState,
	extraReducers: {
		[getCurrentUser.pending]: (state, action) => {
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
		[getCurrentUser.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		}
	}
})

export default getCurrentUserDataSlice.reducer
