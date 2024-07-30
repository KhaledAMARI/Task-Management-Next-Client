"use client";

import { FC } from "react";
import { NewTaskProps } from "../create-task/interface";

export const getTasks = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_API_URI}/tasks`, options);
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
            console.log('An Error has occurred: Cannot get data from server');
        }
        return await response.json();
    } catch (error) {
        console.log('An Error has occurred: ', error);
    }
};

