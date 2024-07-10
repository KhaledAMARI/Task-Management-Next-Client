import React, { FC } from 'react'
import { CardProps } from './interface'

const Card: FC<CardProps> = ({ id, title, description, status }) => {
  return (
    <div>
      <ul>
        <li>ID: {id}</li>
        <li>Title: {title}</li>
        <li>Description: {description}</li>
        <li>Status: {status}</li>
      </ul>
    </div>
  )
}

export default Card