export interface TaskProps {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'done';
}
