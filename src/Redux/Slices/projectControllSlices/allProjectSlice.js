import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../../API'
import { ProjectApi } from '../../../API/ProjectsAPI/ProjectApi'

const initialState = {
	data: [],
	status: null,
	error: null
}

export const findAllProjectsSlice = createAsyncThunk(
	'project/findAllProjectsSlice',
	async function ([token], { rejectWithValue }) {
		try {
			instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
			const response = await ProjectApi.findAllProject()
			const { response: projectsArray } = await response.data
			return projectsArray
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const getAllProjectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		addProject(state, action) {
			state.data.push(action.payload)
		},
		removeProjectById(state, action) {
			state.data = state.data.filter((data) => data.id !== action.payload)
		},
		updateProjectById(state, action) {
			state.data = state.data.filter((data) => data.id !== action.payload.id)
			state.data.push(action.payload)
		}
	},

	extraReducers: {
		[findAllProjectsSlice.pending]: (state) => {
			state.status = 'pending'
			state.error = null
		},
		[findAllProjectsSlice.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.data = action.payload
		},
		[findAllProjectsSlice.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		}
	}
})

export const { addProject, removeProjectById, updateProjectById } =
	getAllProjectSlice.actions

export default getAllProjectSlice.reducer
