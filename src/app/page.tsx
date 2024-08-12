"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Board from "./components/Board";
import { getTasks } from "./services/tasks";
import { useTaskStore } from "./store";
import { useTaskStoreProps } from "./store/interface";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import {
  ADD_NEW_TASK_LABEL,
  DONE_LABEL,
  DONE_VALUE,
  INPROGRESS_LABEL,
  INPROGRESS_VALUE,
  PAGE_TITLE,
  PENDING_LABEL,
  PENDING_VALUE,
} from "./constants";

export default function Home() {
  const router = useRouter();

  const { tasks, setTasks, isLoading, setIsLoading, toastData } = useTaskStore(
    (state: useTaskStoreProps) => state
  );
  const [taskType, setTaskType] = useState("");

  useEffect(() => {
    if (tasks.data.length === 0) {
      setIsLoading(true);
      getTasks()
        .then((response) => {
          response?.data.length > 0 && setTasks(response);
          setIsLoading(false);
        })
        .catch((error) => console.log("🚀 ~ useEffect ~ error:", error));
    }
  }, []);

  const handleTaskTypeSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setTaskType(e.target.value);
    const data = {
      taskStatus: e.target.value,
    };
    const queryString = new URLSearchParams(data).toString();
    router.push(`/create-task?${queryString}`);
  };

  return (
    <>
      {isLoading && <Loader />}
      <main className="w-full flex min-h-screen flex-col items-center justify-between p-24 bg-[#F7F9F2]">
        <div>
          <h1 className="text-[#3468C0] mb-4">{PAGE_TITLE}</h1>
        </div>
        <select
          value={taskType}
          onChange={handleTaskTypeSelection}
          className="p-3 bg-[#86B6F6] text-[#10439F] rounded-lg"
        >
          <option value="" disabled>
            {ADD_NEW_TASK_LABEL}
          </option>
          <option value={PENDING_VALUE}>{PENDING_LABEL}</option>
          <option value={INPROGRESS_VALUE}>{INPROGRESS_LABEL}</option>
          <option value={DONE_VALUE}>{DONE_LABEL}</option>
        </select>
        <Board />
      </main>
      {toastData.isVisible && (
        <Toast severity={toastData.severity} message={toastData.message} />
      )}
    </>
  );
}
