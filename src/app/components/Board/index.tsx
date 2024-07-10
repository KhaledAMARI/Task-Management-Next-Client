"use client"
import React from 'react'
import BoardColumn from '../BoardColumn'

const Board = ({ data }: any) => {
  const columns = [
    { title: 'PENDING', cards: data?.filter((d: any) => d.status.toLowerCase() === 'pending') },
    { title: 'IN PROGRESS', cards: data?.filter((d: any) => d.status.toLowerCase() === 'in-progress') },
    { title: 'DONE', cards: data?.filter((d: any) => d.status.toLowerCase() === 'done') }
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