"use client";

import React, { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useTaskStore } from '@/app/store';
import { useTaskStoreProps } from '@/app/store/interface';
import { useRouter, useParams } from 'next/navigation';
import { editTask, getTaskById, getTasks } from '@/app/services/tasks';

const EditTask = () => {
  const initTaskValues = {
    id: -1,
    title: '',
    description: '',
    status: 'pending' as 'pending' | 'in-progress' | 'done',
  }
  const router = useRouter();
  const params = useParams();
  const { taskId } = params;

  const {isLoading, setIsLoading, setToastData, setTasks } = useTaskStore((state: useTaskStoreProps) => state);
  const [task, setTask] = useState(initTaskValues);
  
  useEffect(() => {
    const getTask = async () => {
      const oldTask = await getTaskById(+taskId);
      setTask(oldTask);
    }
    getTask();
  }, []);

  const handleSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await editTask(task);
    const data = await getTasks();
    setTasks(data);
    setIsLoading(false);
    router.push('/');
    if (data) {
      const toastData = {
        isVisible: true,
        severity:'success',
        message: 'Task Updated successfully!'
      }
      setToastData(toastData)
    }
  }
  const handleReset:FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    router.back();
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTask(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }
  
  return (
    <div className='flex-col w-full min-h-dvh bg-[#F7F9F2] text-[#10439F] gap-4'>
    <div>
      <div className='ml-20 pt-16'>
        <button type='button' className='text-7xl w-8 h-8 hover:cursor-pointer' onClick={() => router.back()}>
        <ArrowCircleLeftIcon
          style={{ transform: 'scale(2)'}}
          />
        </button>
      </div>
      <h2 className='text-center font-bold text-7xl mb-4 text-[#10439F]'>Edit Task - {taskId}</h2>
    </div>
    <div className='w-full min-h-full justify-center items-center'>
      <form className='border rounded-md bg-gray-200 flex-col gap-5 p-2 my-0 mx-auto min-h-96 w-1/2 text-center font-bold' onSubmit={handleSubmit} onReset={handleReset}>
        <div className='mb-36'>
          <div className='mb-5'>
            <label className='w-1/3 flex justify-start items-center mb-2 text-sm font-bold' htmlFor='title'>Title</label>
            <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-normal" placeholder="Task Title"  value={task.title} onChange={handleInput} required />
          </div>
          <div className='gap-7 mb-5 w-full'>
            <label className='w-1/3 flex justify-start items-center' htmlFor='description'>Description</label>
            <textarea id='description' name='description' rows={2} value={task.description} onChange={handleInput} required className="font-normal outline-0 block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Leave a Description here..." />
          </div>
          <div className='gap-5 mb-5 w-full'>
          <label htmlFor="status" className="w-1/3 flex justify-start items-center">Status</label>
          <select
            id="status"
            name='status'
            value={task.status}
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
          <button className='outline p-3 rounded w-1/3' type='submit'>
            {
              isLoading
              ? <div>
                <svg aria-hidden="true" role="status" className="inline w-7 h-7 me-3 text-gray-200 animate-spin dark:text-white-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                </svg>
                <span className='text-gray-500 font-normal'>Processing...</span>
              </div>
              : 'Edit'
            }
            
          </button>
          <button className='outline p-3 rounded w-1/3' type='reset'>Cancel</button>
        </div>
      </form>
    </div>

  </div>
  )
}

export default EditTask;