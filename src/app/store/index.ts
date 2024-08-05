import { create } from 'zustand';
import { TasksProps, useTaskStoreProps, ToastProps } from './interface';

const initialData: TasksProps = {
  data: [],
  meta: {
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 0,
    page: 0,
    pageCount: 0,
    take: 0,
  }
}

const initialToastData: ToastProps = {
  isVisible: false,
  severity: '',
  message: '',
}


export const useTaskStore = create<useTaskStoreProps>((set) => ({
  tasks: initialData,
  setTasks: (tasks) => {set({tasks})},
  isLoading: false,
  setIsLoading: (value) => {set({isLoading: value})},
  toastData: initialToastData,
  setToastData: (value: ToastProps) => {set({toastData: value})}
}));
