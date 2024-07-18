"use client"
import React, { ChangeEvent, FormEventHandler, useState } from 'react'

const CreateTask = () => {
  const initialTask = {
    title: '',
    description: '',
    status: ''
  };
  
  const [newTask, setNewTask] = useState(initialTask)
  console.log("🚀 ~ CreateTask ~ newTask:", newTask)
  const handleSubmit:FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("🚀 ~ handleSubmit ~ e:", e)
  }
  const handleReset:FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("🚀 ~ handleReset ~ e:", e)
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("🚀 ~ handleInput ~ e:", e)
    setNewTask(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  return (
    <div className='flex-col justify-center items-center'>
      <h2>Create NEw Task</h2>
      <form className='border rounded-md bg-slate-300 flex-col justify-center items-center p-2 text-Black h-full w-full' onSubmit={handleSubmit} onReset={handleReset}>
        <div className='flex-col'>
          <label className='' htmlFor='title'>Title</label>
          <input className='' type='text' id='title' name='title' value={newTask.title} onChange={handleInput} required />
        </div>
        <div>
          <label htmlFor='description'>Title</label>
          <input type='text' id='description' name='description' value={newTask.description} onChange={handleInput} required />
        </div>
        <div>
          <label htmlFor='status'>Status</label>
          <input type='text' id='status' name='status' value={newTask.status} onChange={handleInput} required />
        </div>
        <div>
          <button type='submit'>Submit</button>
          <button type='reset'>Reset</button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask