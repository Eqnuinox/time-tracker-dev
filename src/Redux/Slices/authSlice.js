import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthAPI } from '../../API/Auth/AuthApi'

const initialState = {
	id: null,
	email: null,
	status: null,
	error: null
}

export const fetchUser = createAsyncThunk(
	'admin/fetchUser',
	async function ([email, password], { rejectWithValue }) {
		try {
			const response = await AuthAPI.login(email, password)

			if (response.data.success === false) {
				throw new Error('invalid email or password')
			}

			const { data } = await response
			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const authSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		setUser(state, action) {
			state.id = action.payload.id
			state.email = action.payload.email
		},
		removeUser(state) {
			state.id = null
			state.email = null
		}
	},
	extraReducers: {
		[fetchUser.pending]: (state) => {
			state.status = 'pending'
			state.error = null
		},
		[fetchUser.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.id = action.payload.user.id
			state.email = action.payload.user.email
		},
		[fetchUser.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		}
	}
})

export const { setUser, removeUser } = authSlice.actions

export default authSlice.reducer
