import React from 'react'
import BoardColumn from '../BoardColumn'

const Board = () => {
  return (
    <div className="flex space-x-4 p-4">
      <BoardColumn title="PENDING" />
      <BoardColumn title="In Progress" />
      <BoardColumn title="Done" />
    </div>
  )
}

export default Board