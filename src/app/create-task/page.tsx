"use client"
import React, { ChangeEvent, FormEventHandler, useState } from 'react'
import { createTask, getTasks } from '../services/tasks';
import { NewTaskProps } from './interface';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTaskStore } from '../store';

const CreateTask = () => {
  const router = useRouter();
  const useParams = useSearchParams();
  const taskStatus = useParams.get('taskStatus');
  const setTasks = useTaskStore((state: any) => state.setTasks);

  const initialTask:NewTaskProps = {
    title: '',
    description: '',
    //@ts-ignore
    status: taskStatus
  };
  
  const [newTask, setNewTask] = useState(initialTask)
  const handleSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await createTask(newTask);
    const data = await getTasks();
    setTasks(data);
    router.push('/');
  }
  const handleReset:FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setNewTask(initialTask);
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  return (
    <div className='flex-col w-full min-h-dvh bg-slate-300 text-slate-800 gap-4'>
      <h2 className='text-center font-bold text-7xl mb-4'>Create New Task</h2>
      <form className='border rounded-md bg-gray-400 flex-col gap-5 justify-center items-center p-2 min-h-96 w-1/2 text-center font-bold' onSubmit={handleSubmit} onReset={handleReset}>
        <div className='flex gap-5 mb-5'>
          <label className='w-1/3 flex justify-start items-center' htmlFor='title'>Title</label>
          <input className='w-2/3 font-normal outline-0 p-2 rounded-md' type='text' id='title' name='title' value={newTask.title} onChange={handleInput} required />
        </div>
        <div className='flex gap-7 mb-5 w-full'>
          <label className='w-1/3 flex justify-start items-center' htmlFor='description'>Description</label>
          <input className='w-2/3 font-normal outline-0 p-2 rounded-md' type='text' id='description' name='description' value={newTask.description} onChange={handleInput} required />
        </div>
        <div className='flex gap-5 mb-5 w-full'>
          <label className='w-1/3 flex justify-start items-center' htmlFor='status'>Status</label>
          <input className='w-2/3 font-normal outline-0 p-2 rounded-md' type='text' id='status' name='status' value={newTask.status} onChange={handleInput} required />
        </div>
        <div className='flex gap-5  mb-5 w-full justify-center items-center'>
          <button className='outline p-3 rounded' type='submit'>Submit</button>
          <button className='outline p-3 rounded' type='reset'>Reset</button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask