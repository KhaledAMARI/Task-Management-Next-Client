"use client"
import React, { ChangeEvent, FormEventHandler, Suspense, useState } from 'react'
import { createTask, getTasks } from '../services/tasks';
import { NewTaskProps } from './interface';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTaskStore } from '../store';
import './style.css';

const CreateTask = () => {
  const searchParams = useSearchParams();
  const taskStatus = searchParams.get('taskStatus') as 'pending' | 'in-progress' | 'done';
  const setTasks = useTaskStore((state: any) => state.setTasks);
  const router = useRouter();

  const initialTask:NewTaskProps = {
    title: '',
    description: '',
    status: taskStatus || 'pending'
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

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNewTask(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  return (
    <div className='flex-col w-full min-h-dvh bg-[#F7F9F2] text-[#10439F] gap-4'>
      <h2 className='text-center font-bold text-7xl mb-4 text-[#10439F]'>Create New Task</h2>
      <div className='w-full min-h-full justify-center items-center'>
        <form className='border rounded-md bg-gray-200 flex-col gap-5 p-2 my-0 mx-auto min-h-96 w-1/2 text-center font-bold' onSubmit={handleSubmit} onReset={handleReset}>
          <div className='mb-36'>
            <div className='mb-5'>
              <label className='w-1/3 flex justify-start items-center mb-2 text-sm font-bold' htmlFor='title'>Title</label>
              <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-normal" placeholder="Task Title"  value={newTask.title} onChange={handleInput} required />
            </div>
            <div className='gap-7 mb-5 w-full'>
              <label className='w-1/3 flex justify-start items-center' htmlFor='description'>Description</label>
              <textarea id='description' name='description' rows={2} value={newTask.description} onChange={handleInput} required className="font-normal outline-0 block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Leave a Description here..." />
            </div>
            <div className='gap-5 mb-5 w-full'>
            <label htmlFor="status" className="w-1/3 flex justify-start items-center">Status</label>
            <select
              id="status"
              name='status'
              value={newTask.status}
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-normal"
              required
              >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            </div>
          </div>
          <div className='flex gap-5 mb-0 mt-5 w-full justify-center items-center'>
            <button className='outline p-3 rounded w-1/3' type='submit'>Submit</button>
            <button className='outline p-3 rounded w-1/3' type='reset'>Reset</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default CreateTask