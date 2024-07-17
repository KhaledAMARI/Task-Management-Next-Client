"use client"
import React from 'react'
import BoardColumn from '../BoardColumn'
import {useTaskStore} from '@/app/store'

const Board = () => {
  const tasks = useTaskStore((state: any) => state.tasks);
  const columns = [
    { title: 'PENDING', cards: tasks?.data?.filter((d: any) => d.status.toLowerCase() === 'pending') },
    { title: 'IN PROGRESS', cards: tasks?.data?.filter((d: any) => d.status.toLowerCase() === 'in-progress') },
    { title: 'DONE', cards: tasks?.data?.filter((d: any) => d.status.toLowerCase() === 'done') }
  ];

  return (
    <div className="flex space-x-4 p-4 w-full">
      {
        columns && columns.map(col => <BoardColumn key={col.title} title={col.title} data={col.cards} />)
      }
    </div>
  )
}

export default Board