import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TasksApi } from '../../../API/TasksAPI/tasksApi'

const initialState = {
	data: [],
	error: null,
	status: null
}

export const findAllTasksSlice = createAsyncThunk(
	'project/findAllTasks',
	async function (id = '', { rejectWithValue }) {
		try {
			const response = await TasksApi.findAllTasks(id)
			const data = await response.data.response
			return data
		} catch (error) {
			rejectWithValue(error.message())
		}
	}
)

const getAllTasksSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		addNewTask() {},
		removeTask() {},
		updateTask() {}
	},

	extraReducers: {
		[findAllTasksSlice.pending]: (state) => {
			state.status = 'pending'
			state.error = null
		},
		[findAllTasksSlice.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'resolved'
		},
		[findAllTasksSlice.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		}
	}
})

export const { addNewTask, removeTask, updateTask } = getAllTasksSlice.actions

export default getAllTasksSlice.reducer
