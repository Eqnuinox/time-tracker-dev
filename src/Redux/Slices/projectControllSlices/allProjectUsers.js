import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProjectApi } from '../../../API/ProjectsAPI/ProjectApi'

const initialState = {
	data: [],
	status: null,
	error: null
}

export const findAllProjectUserSlice = createAsyncThunk(
	'project/findAllProjectUserSlice',
	async function (id, { rejectWithValue }) {
		try {
			const { data } = await ProjectApi.findProjectUsers()
			const { response } = await data
			return response
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const getAllProjectUsersSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		addUserInProject(state, action) {
			state.data.push(action.payload)
		},
		removeUserFromProject(state, action) {
			state.data = state.data.filter((item) => item.id !== action.payload)
		},
		updateProjectUser(state, action) {
			state.data = state.data.filter((item) => item.id !== action.payload)
			state.data.push(action.payload)
		}
	},

	extraReducers: {
		[findAllProjectUserSlice.pending]: (state) => {
			state.status = 'pending'
			state.error = null
		},
		[findAllProjectUserSlice.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.data = action.payload
		},
		[findAllProjectUserSlice.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		}
	}
})

export const { addUserInProject, removeUserFromProject } =
	getAllProjectUsersSlice.actions

export default getAllProjectUsersSlice.reducer
