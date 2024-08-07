import { TaskProps, TasksProps, ToastDataProps } from './interface';

export const PAGE_TITLE: string = 'Task management Dashboard';
export const PAGE_DESCRIPTION: string = 'A task management dashboard';

export const PENDING_LABEL: string = 'PENDING';
export const PENDING_VALUE: string = 'pending';

export const INPROGRESS_LABEL: string = 'IN PROGRESS';
export const INPROGRESS_VALUE: string = 'in-progress';

export const DONE_LABEL: string = 'Done';
export const DONE_VALUE: string = 'done';

export const TASK_TITLE_LABEL: string = 'Task Title';
export const TASK_DESCRIPTION_LABEL: string = 'Task Description';
export const TASK_STATUS_LABEL: string = 'Task Status';

export const LOADING_LABEL: string = 'Loading...';
export const PROCESSING_LABEL: string = 'Processing ...';
export const CANCEL_LABEL: string = 'Cancel';

export const EDIT_TASK_LABEL: string = 'Edit Task';

export const SUCCESS_DELETE_TOAST_DATA: ToastDataProps = {
    isVisible: true,
    severity: 'success',
    message: 'Task deleted successfully!'
  }

export const SUCCESS_UPDATE_TOAST_DATA: ToastDataProps = {
    isVisible: true,
    severity: 'success',
    message: 'Task updated successfully!'
  }

export const INITIAL_TOAST_DATA: ToastDataProps = {
    isVisible: false,
    severity: '',
    message: ''
  }

export const INITIAL_TASK_VALUE: TaskProps = {
    id: -1,
    title: '',
    description: '',
    status: 'pending',
  }
export const DEFAULT_TASKS_VALUE: TasksProps = {
    data: [],
    meta: {
      hasNextPage: false,
      hasPreviousPage: false,
      itemCount: 0,
      page: 0,
      pageCount: 0,
      take: 0,
    }
  }

export const GET_REQUEST_HEADERS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}