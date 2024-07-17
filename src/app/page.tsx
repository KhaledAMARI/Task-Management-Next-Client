"use client"
import { useEffect } from "react";
import Board from "./components/Board";
import { getTasks } from "./services/tasks";
import {useTaskStore} from "./store";

export default function Home() {
  const setTasks = useTaskStore((state: any) => state.setTasks);
  const tasks = useTaskStore((state: any) => state.tasks);
  
  useEffect(() => {
    if (tasks.data.length === 0) {
      getTasks().then((response) => response?.data.length > 0 && setTasks(response)).catch((error) => console.log("🚀 ~ useEffect ~ error:", error));
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Task Management Board</h1>
      </div>
      <Board />
    </main>
  );
}
