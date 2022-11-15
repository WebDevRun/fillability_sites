import { configureStore } from '@reduxjs/toolkit'
import schoolReducer from './schools'

export default configureStore({
  reducer: {
    schools: schoolReducer,
  },
})
