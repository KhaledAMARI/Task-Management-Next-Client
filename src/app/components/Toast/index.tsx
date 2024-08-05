'use client';

import React, { FC, UIEventHandler } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ToastProps } from './interface'
import { useTaskStore } from '@/app/store';
import { useTaskStoreProps } from '@/app/store/interface';

const Toast: FC<ToastProps> = ({ severity, message }) => {
  const setToastData = useTaskStore(((state: useTaskStoreProps) => state.setToastData));

  const closeToast: UIEventHandler = (e) => {
    e.stopPropagation();
    const toastData = {
        isVisible: false,
        severity: '',
        message: '',
    }
    setToastData(toastData);
  }

  return (
    <div id="toast" className="absolute top-11 right-2 flex items-center w-max max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div
        className={`
            inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg
            ${
                severity === 'success'
                ? 'text-green-500 bg-green-100'
                : severity === 'error'
                ? 'text-red-500 bg-red-100'
                : severity === 'infos'
                ? 'text-blue-500 bg-blue-100'
                : ''
            }
        `}
        >
        {
            severity ==='success'
            ? <CheckCircleIcon />
            : severity === 'error'
            ? <WarningAmberIcon />
            : severity === 'infos'
            ? <InfoIcon />
            : null
        }
        <span className="sr-only">Check icon</span>
    </div>
    <div className="ms-3 text-sm font-normal">{message}</div>
    <button type="button" onClick={closeToast} className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
</div>
  )
}

export default Toast;