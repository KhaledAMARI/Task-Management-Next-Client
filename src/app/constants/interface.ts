export interface ToastDataProps {
    isVisible: boolean;
    severity: string;
    message: string;
}
export interface TaskProps {
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