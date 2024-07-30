"use client"
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Board from "./components/Board";
import { getTasks } from "./services/tasks";
import {useTaskStore} from "./store";

export default function Home() {
  const router = useRouter();

  const setTasks = useTaskStore((state: any) => state.setTasks);
  const tasks = useTaskStore((state: any) => state.tasks);
  const [taskType, setTaskType] = useState('');
  
  useEffect(() => {
    if (tasks.data.length === 0) {
      getTasks().then((response) => {
        response?.data.length > 0 && setTasks(response);
      }).catch((error) => console.log("🚀 ~ useEffect ~ error:", error));
    }
  }, []);

  const handleTaskTypeSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setTaskType(e.target.value);
    const data = {
      taskStatus: JSON.stringify(e.target.value),
    };
    const queryString = new URLSearchParams(data).toString();
    router.push(`/create-task?${queryString}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Task Management Board</h1>
      </div>
      <select value={taskType} onChange={handleTaskTypeSelection} className='p-3 bg-white text-black'>
        <option value="" disabled>Add New Task</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <Board />
    </main>
  );
}
