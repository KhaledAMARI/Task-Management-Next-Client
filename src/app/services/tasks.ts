"use client";

import { FC } from "react";
import { NewTaskProps } from "../create-task/interface";
import { TaskProps } from "./interface";
import { GET_REQUEST_HEADERS } from "../constants";

export const getTasks = async () => {
    try {
        const options = GET_REQUEST_HEADERS;
        const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_API_URI}/tasks`, options);
        if (!response.ok) {
            console.log('An Error has occurred: Cannot get data from server');
        }
        return await response.json();
    } catch (error) {
        console.log('An Error has occurred: ', error);
    }
}

export const getTaskById = async (id: number) => {
    try {
        const options = GET_REQUEST_HEADERS;
        const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_API_URI}/tasks/${id}`, options);
        if (!response.ok) {
            console.log('An Error has occurred: Cannot get data from server');
        }
        return await response.json();
    } catch (error) {
        console.log('An Error has occurred: ', error);
    }
}

export const createTask: FC<NewTaskProps> = async (newTask) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_API_URI}/tasks`, options);
        if (!response.ok) {
            console.log('An Error has occurred: Cannot get data from server', response);
        }
        return await response.json();
    } catch (error) {
        console.log('An Error has occurred: ', error);
    }
};

export const editTask: FC<TaskProps> = async (task) => {
    try {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_API_URI}/tasks/${task.id}`, options);
        if (!response.ok) {
            console.log('An Error has occurred: Cannot get data from server', response);
        }
        return await response.json();
    } catch (error) {
        console.log('An Error has occurred: ', error);
    }
};

