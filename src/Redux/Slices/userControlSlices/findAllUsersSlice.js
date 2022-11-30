import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../../API'
import { UserAPI } from '../../../API/UsersAPI/UserApi'

const initialState = {
	data: null,
	status: null,
	error: null
}

export const findAllUsersSlice = createAsyncThunk(
	'admin/findAllUsersSlice',
	async function ([token, [usersIds]], { rejectWithValue }) {
		try {
			instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
			const response = await UserAPI.findAllUser([usersIds])
			const { response: usersArray } = await response.data

			if (response.data.success === false) {
				throw new Error('Server Error')
			}
			return usersArray
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const getAllUsersSlice = createSlice({
	name: 'admin',
	initialState,
	extraReducers: {
		[findAllUsersSlice.pending]: (state) => {
			state.status = 'pending'
			state.error = null
		},
		[findAllUsersSlice.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.data = action.payload
		},
		[findAllUsersSlice.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		}
	}
})

export default getAllUsersSlice.reducer
