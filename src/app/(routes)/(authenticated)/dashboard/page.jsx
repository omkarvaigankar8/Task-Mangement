'use client'
import Tasks from '../../../../components/UI/Tasks'
import CreateTask from '../../../../components/forms/CreateTask'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'



const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
                aria-label="Close modal"
            >
                &times;
            </button>
            {children}
        </div>
    </div>
);

const Dashboard = () => {
    const [createTask, setCreateTask] = useState(false)
    const tasks = useSelector((state) => state.tasks)
    console.log('tasks', tasks?.tasks)
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold'>Dashboard</h1>
            <button
                className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
                onClick={() => {
                    setCreateTask(true)
                }}>
                Create Task
            </button>
            {createTask && (
                <Modal onClose={() => setCreateTask(false)}>
                    <CreateTask setCreateTask={setCreateTask} />
                </Modal>
            )}
            <Tasks />
        </div>
    )
}

export default Dashboard