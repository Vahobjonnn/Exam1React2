import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { atom } from 'jotai'
import { create } from "zustand";

export const useTodo = create((set) => ({
  data2: [
    {
      id: "1",
      age: "26",
    },
    {
      id: "2",
      age: "27",
    },
  ],
   deleteUserZustand:(id)=> set((state)=> ({data2:state.data2.filter((el)=> el.id != id)}) ),
   addUserZustand:(user)=> set((state)=> ({data2:[...state.data2,user]})),
}))
const initialState = {
  data: [{
    id: "1",
    name: "Vahobjon"
  },
  {
    id: "2",
    name: "Abdurahmon"
  }]
}


export const dataJotai = atom([
  {
    id: "1",
    job: "Farmer"
  },
  {
    id: "2",
    job: "Programmer"
  }
])

export const deleteJotai=atom(null, (get,set,id)=> {
    set(dataJotai, get(dataJotai).filter((el)=> el.id!==id))
})
export const addUserJotai=atom(null, (get,set,user)=> {
  set(dataJotai, [...get(dataJotai),user])
} )

export const counterSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    deleteUser: (state, { payload }) => {
      state.data = state.data.filter((el) => el.id != payload)
    },
    addUserRedux:(state, {payload})=>{
     state.data=[...state.data,payload]
    }
  },
})

export const {deleteUser,addUserRedux}=counterSlice.actions
export default counterSlice.reducer