import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: ''
}

export const helperSlice = createSlice({
  name: 'helper',
  initialState,
  reducers: {
    getSearch: (state, {payload}) => {
      state.search = payload
    }
  },
})


export const { getSearch } = helperSlice.actions

export default helperSlice.reducer