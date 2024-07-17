interface TaskProps {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'done';
}

export interface TasksProps {
    data: TaskProps[];
    meta: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        itemCount: number;
        page: number;
        pageCount: number;
        take: number;
    }
}


export interface useTaskStoreProps {
    tasks: TasksProps;
    setTasks: (tasks: TasksProps) => void;
  }