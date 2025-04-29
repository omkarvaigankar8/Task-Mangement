

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { updateTask as updateTaskAction } from "../../store/features/tasks/taskSlice"; // adjust path as needed

const taskSchema = z.object({
    id: z.string().optional(),
    title: z.string().nonempty("Task title is required"),
    description: z.string().nonempty("Description is required"),
    dueDate: z.string()
        .nonempty("Due date is required")
        .refine((date) => new Date(date) >= new Date(), "Due date cannot be in the past"),
    assignedUser: z.string().nonempty("Assigned user is required"),
});

const UpdateTask = ({ task, onUpdate }) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            assignedUser: task.assignedUser,
        },
    });

    const updateTask = (data) => {
        const updatedTask = { ...task, ...data };
        dispatch(updateTaskAction({ id: task.id, updatedTask }));
        onUpdate();
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(updateTask)}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Task</h2>

                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                        Title
                    </label>
                    <input
                        id="title"
                        {...register("title")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        {...register("description")}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-gray-700 font-medium mb-1">
                        Due Date
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        {...register("dueDate")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.dueDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>
                    )}
                </div>

                <div className="mb-6">
                    <label htmlFor="assignedUser" className="block text-gray-700 font-medium mb-1">
                        Assigned User
                    </label>
                    <input
                        id="assignedUser"
                        {...register("assignedUser")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.assignedUser && (
                        <p className="text-red-500 text-sm mt-1">{errors.assignedUser.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    {isSubmitting ? 'Updating...' : 'Update Task'}
                </button>
            </form>
        </div>
    );
};

export default UpdateTask;