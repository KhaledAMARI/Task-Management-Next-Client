import { create } from 'zustand';
import { TasksProps, useTaskStoreProps, ToastProps } from './interface';
import { DEFAULT_TASKS_VALUE, INITIAL_TOAST_DATA } from '../constants';

export const useTaskStore = create<useTaskStoreProps>((set) => ({
  tasks: DEFAULT_TASKS_VALUE,
  setTasks: (tasks) => {set({tasks})},
  isLoading: false,
  setIsLoading: (value) => {set({isLoading: value})},
  toastData: INITIAL_TOAST_DATA,
  setToastData: (value: ToastProps) => {set({toastData: value})}
}));
