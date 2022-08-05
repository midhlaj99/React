import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import employeeReducer from './employeeSlice.js'

export const store = configureStore({
  reducer: {
    employee: employeeReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})