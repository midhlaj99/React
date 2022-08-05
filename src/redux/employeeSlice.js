import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchEmployees = createAsyncThunk('users/fetchEmployee', async () => {
    const res = await fetch('https://dummy.restapiexample.com/api/v1/employees')
    const jsonRes = await res.json()
    return jsonRes.data
})

export const removeEmployees = createAsyncThunk('users/removeEmployee', async (id,cb) => {
    const res = await fetch(`https://dummy.restapiexample.com/api/v1/delete/${id}`,{
        method:'DELETE'
    })
    const jsonRes = await res.json()
    return jsonRes.data
})

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employeeList: [],
        loading: false,
        deleting:false,
        deleted:false
    },
    reducers: {
        toggleDeleted : (state,action) => {
            state.deleted = action.payload
        },
    },
    extraReducers: {
        [fetchEmployees.pending]: (state) => {
            state.loading = true;
        },
        [fetchEmployees.fulfilled]: (state, action) => {
            state.loading = false;
            state.employeeList = action.payload;
        },
        [fetchEmployees.rejected]: (state) => {
            state.loading = false;
        },

        [removeEmployees.pending]: (state) => {
            state.deleting = true;
        },
        [removeEmployees.fulfilled]: (state) => {
            state.deleting = false;
            state.deleted = true
        },
        [removeEmployees.rejected]: (state) => {
            state.deleting = false;
        }

    },
})
export const { toggleDeleted } = employeeSlice.actions
export default employeeSlice.reducer

