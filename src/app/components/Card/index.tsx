"use client"
import React, { FC, MouseEventHandler, useEffect, useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { CardProps } from './interface'
import { useTaskStore } from '@/app/store';
import { getTasks } from '@/app/services/tasks';

const Card: FC<CardProps> = ({ id, title, description, status }) => {
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);
  const cardContainer = useRef<HTMLDivElement>(null);
  const setTasks = useTaskStore((state: any) => state.setTasks);

  useEffect(() => {
    const cardContainerElement = cardContainer?.current;
    if (cardContainerElement) {
      cardContainerElement.addEventListener('mouseover', (e: MouseEvent) => {
        setIsCardHovered(true);
      });
    cardContainerElement.addEventListener('mouseleave', (e: MouseEvent) => {
      setIsCardHovered(false);
    });
  }
  return () => {
    if (cardContainerElement) {
    cardContainerElement.removeEventListener('mouseover', (e: MouseEvent) => {
      setIsCardHovered(true);
    });
    cardContainerElement.removeEventListener('mouseleave', (e: MouseEvent) => {
      setIsCardHovered(false);
    });
  }
  }
  }, []);

  const handleDeletion: MouseEventHandler = async (e) => {
    e.stopPropagation();
    const response = await fetch(`http://localhost:4000/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      getTasks().then((response) => setTasks(response)).catch((error) => console.log("🚀 ~ useEffect ~ error:", error));
    }
    
  };
  return (
    <div ref={cardContainer} onClick={e => console.log('first')} className='w-3/4 h-5 border rounded-md bg-white h-[100px] m-1 flex-col items-between p-2 text-black hover:cursor-pointer relative'>
      <div className='relative flex justify-between'>
        <div  onClick={e => console.log('second')} className='flex gap-1'>
          <span>{id}</span>
          {' '} - {' '}
          <h2>{title}</h2>
        </div>
        {isCardHovered && <button onClick={handleDeletion}><DeleteIcon className='absolute top-0 right-2' /></button>}
      </div>
      <div>
        <div>
          <p>{description}</p>
        </div>
        <div className='flex justify-end p-2'>
          <span style={{ background: status.toLowerCase() === 'pending' ? '#FFF455' : status.toLowerCase() === 'in-progress' ?  '#36C2CE' : '#C3FF93'}}>{status}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;
