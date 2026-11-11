
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataJotai, useTodo, deleteJotai, deleteUser, addUserRedux, addUserJotai } from '@/reducers/counter'
import { useAtom } from 'jotai'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  const { data } = useSelector((store) => store.todo)
  const [data1] = useAtom(dataJotai)
  const [, deleteUserJotai] = useAtom(deleteJotai)
  const [, addUserJotaai] = useAtom(addUserJotai)
  const dispatch = useDispatch()
  const { data2, deleteUserZustand, addUserZustand } = useTodo()
  const [search, setSearch] = useState("")
  const datagl = []

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data1.length; j++) {
      for (let t = 0; t < data2.length; t++) {
        if (data[i].id === data1[j].id && data1[j].id == data2[t].id) {
          datagl.push({
            ...data[i],
            ...data1[j],
            ...data2[t]
          })
        }
      }
    }
  }


  function handleSubmit(e) {
    e.preventDefault()
    let idx = Date.now()
    let newUser1 = {
      id: idx,
      name: e.target.name.value
    }
    let newUser2 = {
      id: idx,
      job: e.target.job.value
    }
    let newUser3 = {
      id: idx,
      age: e.target.age.value
    }
    addUserZustand(newUser3)
    dispatch(addUserRedux(newUser1))
    addUserJotaai(newUser2)
    e.target.reset()
  }

  return (
    <>
      <div className='p-4'>
        <Input className="w-[300px] block" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Dialog>
          <DialogTrigger><button className=' bg-green-500 p-2 text-white mt-2'>Open</button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2' action="">
                  <Input name="name" />
                  <Input name="job" />
                  <Input name="age" />
                  <DialogClose><button type='submit'>submit</button></DialogClose>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Job</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datagl.filter((el) => el.name.toLowerCase().includes(search.toLowerCase())).map((el) => {
              return <TableRow key={el.id}>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.job}</TableCell>
                <TableCell>{el.age}</TableCell>
                <TableCell>
                  <button onClick={() => {
                    deleteUserJotai(el.id)
                    dispatch(deleteUser(el.id))
                    deleteUserZustand(el.id)
                  }}>
                    Delete
                  </button>
                </TableCell>
              </TableRow>

            })}
          </TableBody>
        </Table>

      </div>
    </>
  )
}

export default Home
