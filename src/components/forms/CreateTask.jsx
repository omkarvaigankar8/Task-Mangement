import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { createTask } from '../../store/features/tasks/taskSlice';
import { persistor } from '../../store/store';

const CreateTask = ({ setCreateTask }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("data", data);
        // Handle task creation logic here
    };
    const clearData = () => {
        persistor.purge();
    }
    const taskSchema = z.object({
        id: z.string().optional(),
        title: z.string().nonempty('Task title is required'),
        description: z.string().nonempty('Description is required'),
        dueDate: z.string()
            .nonempty('Due date is required')
            .refine((date) => new Date(date) >= new Date(), 'Due date cannot be in the past'),
        assignedUser: z.string().nonempty('Assigned user is required'),
    });

    const dispatch = useDispatch();
    return (
        <form
            onSubmit={handleSubmit((data) => {
                console.log('data', data);
                const taskWithId = { ...data, id: Math.random().toString(36).substring(2, 15) };
                console.log("taskWithId", taskWithId)
                const parsedData = taskSchema.safeParse(taskWithId);
                if (!parsedData.success) {
                    console.error(parsedData.error.errors);
                    return;
                }
                console.log("parsedData", parsedData)
                // const taskWithId =  { ...parsedData.data, id: uuid4() };
                console.log("taskWithId")
                console.log("taskWithId", taskWithId)
                console.log("parsedData", parsedData)

                dispatch(createTask(parsedData.data));
                setCreateTask(false);
            })}
            className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md"
        >
            <div className="mb-4">
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                >
                    Task Title
                </label>
                <input
                    id="title"
                    {...register('title')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    {...register('description')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-700"
                >
                    Due Date
                </label>
                <input
                    type="date"
                    id="dueDate"
                    {...register('dueDate', { required: 'Due date is required' })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
                {errors.dueDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label
                    htmlFor="assignedUser"
                    className="block text-sm font-medium text-gray-700"
                >
                    Assigned User
                </label>
                <input
                    id="assignedUser"
                    {...register('assignedUser', { required: 'Assigned user is required' })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
                {errors.assignedUser && (
                    <p className="text-red-500 text-sm mt-1">{errors.assignedUser.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Create Task
            </button>
            <button
                type="button"
                onClick={() => setCreateTask(false)}
                className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                Cancel
            </button>
            <button
                type="button"
                onClick={() => clearData()}
                className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Clear Data
            </button>
        </form>
    );
};

export default CreateTask;