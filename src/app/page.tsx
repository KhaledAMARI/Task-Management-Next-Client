"use client"
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Board from "./components/Board";
import { getTasks } from "./services/tasks";
import {useTaskStore} from "./store";
import { useTaskStoreProps } from "./store/interface";
import Loader from "./components/Loader";
import Toast from "./components/Toast";

export default function Home() {
  const router = useRouter();

  const { tasks, setTasks, isLoading, setIsLoading, toastData } = useTaskStore((state: useTaskStoreProps) => state);
  const [taskType, setTaskType] = useState('');
  
  useEffect(() => {
    if (tasks.data.length === 0) {
      setIsLoading(true);
      getTasks().then((response) => {
        response?.data.length > 0 && setTasks(response);
      setIsLoading(false);
      }).catch((error) => console.log("🚀 ~ useEffect ~ error:", error));
    }
  }, []);

  const handleTaskTypeSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setTaskType(e.target.value);
    const data = {
      taskStatus: e.target.value,
    };
    const queryString = new URLSearchParams(data).toString();
    router.push(`/create-task?${queryString}`);
  }

  return (
    <>
      {isLoading && <Loader />}
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#F7F9F2]">
        <div>
          <h1 className="text-[#3468C0] font-bold text-7xl mb-4">Task Management Board</h1>
        </div>
        <select value={taskType} onChange={handleTaskTypeSelection} className='p-3 bg-[#86B6F6] text-[#10439F] rounded-lg'>
          <option value="" disabled>Add New Task</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <Board />
      </main>
      {
          toastData.isVisible && <Toast severity={toastData.severity} message={toastData.message}/>
      }
    </>
  );
}
