export interface CardProps {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done'
}

export interface BoardProps {
  data: CardProps[]
}