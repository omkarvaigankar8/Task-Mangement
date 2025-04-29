import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: 'tasks', // Ensure this matches the key in your Redux store
    initialState,
    reducers: {
        createTask: (state, action) => {
            const { title, description, dueDate, assignedUser } = action.payload;
            if (title && description && dueDate && assignedUser) {
                state.tasks.push(action.payload);
            } else {
                console.error('Task must have title, description, dueDate, and assignedUser.');
            }
        },
        updateTask: (state, action) => {
            const { id, updatedTask } = action.payload;
            const taskIndex = state.tasks.findIndex(task => task.id === id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
            }
        },
        deleteTask: (state, action) => {
            const taskId = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== taskId);
        },
    },
});

export const { createTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;