"use client"
import React, { FC } from 'react'
import { BoardColumnProps } from './interface'
import Card from '../Card'

const BoardColumn: FC<BoardColumnProps> = ({ title, data }) => {
  return (
    <div className="w-1/3 bg-gray-200 p-4 rounded-md min-h-dvh">
      <h2 className="text-xl font-bold mb-4 text-center bg-[#BBE9FF]">{title}</h2>
      <div className='w-full gap-5 flex-col h-full justify-center items-center'>
        {
          data && data.map((cardDetails: any) => <Card key={cardDetails.id} {...cardDetails} />)
        }
      </div>
    </div>
  )
}

export default BoardColumn