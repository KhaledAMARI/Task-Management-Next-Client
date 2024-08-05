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

export interface ToastProps {
    isVisible: boolean;
    severity: string;
    message: string;
}


export interface useTaskStoreProps {
    tasks: TasksProps;
    setTasks: (tasks: TasksProps) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    toastData: ToastProps;
    setToastData: (value: ToastProps) => void;
  }