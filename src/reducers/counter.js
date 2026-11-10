import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  data: [
    {
      id: 1,
      name: "Vahobjon",
      job: "Farmer"
    },
    {
      id: 2,
      name: "Muhammad",
      job: "Farmer"
    },
    {
      id: 3,
      name: "Vahobjon",
      job: "Programmer"
    },
    {
      id: 4,
      name: "Anas",
      job: "Driver"
    },
  ]
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    deleteUser: (state, { payload }) => {
      state.data = state.data.filter((el) => el.id != payload)
    },
    editUser: (state, { payload }) => {
      state.data = state.data.map((el) => el.id == payload.id ? payload : el)
    },
    addUser:(state, {payload})=>{
     state.data=[...state.data,payload]
    }
  }
})

export const { deleteUser, editUser,addUser } = counterSlice.actions

export const selectCount = (state) => state.counter.value

export default counterSlice.reducer