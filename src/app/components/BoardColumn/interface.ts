
interface dataProps {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done';
}
export interface BoardColumnProps {
  title: string;
  data: dataProps[];
}