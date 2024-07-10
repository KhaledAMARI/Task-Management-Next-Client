import React, { FC } from 'react'
import { BoardColumnProps } from './interface'
import Card from '../Card'

const BoardColumn: FC<BoardColumnProps> = ({ title }) => {
  return (
    <div className="w-1/3 bg-gray-200 p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Card id={1} title="Example Task 1" description='test 1' status='pending' />
      <Card id={2} title="Example Task 2" description='test 2' status='done' />
    </div>
  )
}

export default BoardColumn