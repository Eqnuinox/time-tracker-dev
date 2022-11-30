import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../../API'
import { UserAPI } from '../../../API/UsersAPI/UserApi'

const initialState = {
	status: null,
	error: null
}

export const createUsers = createAsyncThunk(
	'users/createUserSlice',
	async function ([token, { newUserData }], { rejectWithValue }) {
		const { email, firstName, lastName, password } = newUserData

		try {
			instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
			const response = await UserAPI.createUser(
				email,
				firstName,
				lastName,
				password
			)
			const { data } = await response

			if (data.success === false) {
				throw new Error('Server Error')
			}

			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const getCreateUsersSlice = createSlice({
	name: 'users',
	initialState,
	extraReducers: {
		[createUsers.pending]: (state) => {
			state.status = 'pending'
			state.error = null
		},
		[createUsers.fulfilled]: (state, action) => {
			state.status = 'resolved'
		},
		[createUsers.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		}
	}
})

export default getCreateUsersSlice.reducer
