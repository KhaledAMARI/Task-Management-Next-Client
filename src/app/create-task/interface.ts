export interface NewTaskProps {
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'done';
}