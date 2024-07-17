import create from 'zustand';
import { TasksProps, useTaskStoreProps } from './interface';

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


export const useTaskStore = create<useTaskStoreProps>((set) => ({
  tasks: initialData,
  setTasks: (tasks) => {set({tasks})},
}));
