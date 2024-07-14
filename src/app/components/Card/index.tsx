"use client"
import React, { FC } from 'react'
import { CardProps } from './interface'

const Card: FC<CardProps> = ({ id, title, description, status }) => {
  return (
    <div className='w-3/4 h-5 border rounded-md bg-white h-[100px] m-1 flex-col items-between p-2 text-black'>
      <div className='flex gap-1'>
        <span>{id}</span>
        <h2>{title}</h2>
      </div>
      <div>
        <div>
          <p>{description}</p>
        </div>
        <div className='flex justify-end p-2'>
          <span>{status}</span>
        </div>
      </div>
    </div>
  )
}

export default Card