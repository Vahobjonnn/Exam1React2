import { deleteUser, editUser ,addUser} from '@/reducers/counter'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
const Home = () => {
  const { data } = useSelector((store) => store.counter)
  const [editUs, setEditUs] = useState({})
  const dispatch = useDispatch()

function handleSubmit(e) {
  e.preventDefault()
  let newUser={
    id:Date.now(),
    name:e.target.name.value,
    job:e.target.job.value,
  }
  dispatch(addUser(newUser))
}

  return (
    <>
      <Dialog>
        <DialogTrigger><button className='text-white bg-blue-500 ml-10 p-2'>AddUser</button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit} className='flex flex-col gap-4 ' action="">
                <Input name="name" />
                <Input name="job" />
                <DialogClose><button type='submit'>Submit</button></DialogClose>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className='bg-white px-6 py-10'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {data.map((el) => (
            <div key={el.id} className='flex flex-col gap-6 rounded-2xl shadow-2xl p-6'>
              <div className='flex flex-col gap-1'>
                <h2 className='text-lg font-medium text-gray-900'>{el.name}</h2>
                <p className='text-sm text-gray-500'>{el.job}</p>
              </div>
              <div className='flex gap-4 text-sm'>
                <button className='text-gray-300' onClick={() => dispatch(deleteUser(el.id))} >Delete</button>
                <Dialog>
                  <DialogTrigger><button className='text-black' onClick={() => setEditUs(el)}>Edit</button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          dispatch(editUser(editUs))
                        }} className='flex flex-col gap-4 ' action="">
                          <Input defaultValue={editUs.name} onChange={(e) => setEditUs({ ...editUs, name: e.target.value })} />
                          <Input defaultValue={editUs.job} onChange={(e) => setEditUs({ ...editUs, job: e.target.value })} />
                          <DialogClose><button type='submit'>Submit</button></DialogClose>
                        </form>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home