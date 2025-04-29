// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import UpdateTask, { DeleteTask } from '../forms/UpdateTask'; // Ensure DeleteTask is exported from UpdateTask form
// import { deleteTask as deleteTaskAction } from "../../store/features/tasks/taskSlice"; // adjust path as needed
// const Tasks = () => {
//     const tasks = useSelector((state) => state.tasks.tasks || []);
//     const dispatch = useDispatch();
//     const [isUpdating, setIsUpdating] = useState(false);
//     const [currentTask, setCurrentTask] = useState(null);

//     // Toggle update form for a specific task
//     const handleUpdateClick = (task) => {
//         setCurrentTask(task);
//         setIsUpdating(true);
//     };

//     // After update or delete, reset form state
//     const handleOnChange = () => {
//         setIsUpdating(false);
//         setCurrentTask(null);
//     };

//     return (
//         <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Tasks</h2>
//             {tasks.length > 0 ? (
//                 <ul className="space-y-4">
//                     {tasks.map((task) => (
//                         <li
//                             key={task.id}
//                             className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
//                         >
//                             <div className="flex-1">
//                                 <p className="font-medium text-gray-800">{task.title}</p>
//                                 <p className="text-sm text-gray-500">{task.description}</p>
//                                 <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
//                                 <p className="text-sm text-gray-500">Assigned to: {task.assignedUser}</p>
//                             </div>

//                             <div className="flex space-x-2">
//                                 <button
//                                     className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
//                                     onClick={() => handleUpdateClick(task)}
//                                 >
//                                     Update
//                                 </button>

//                                 <button
//                                     className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
//                                     onClick={() => {
//                                         if (window.confirm('Are you sure you want to delete this task?')) {
//                                             dispatch(deleteTaskAction(task.id));
//                                         }
//                                     }}
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="text-gray-600">No tasks available.</p>
//             )}

//             {isUpdating && currentTask && (
//                 <div className="mt-6">
//                     <UpdateTask task={currentTask} onUpdate={handleOnChange} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Tasks;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UpdateTask from '../forms/UpdateTask';
import { deleteTask as deleteTaskAction } from "../../store/features/tasks/taskSlice";

// Simple Modal component using Tailwind
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

const Tasks = () => {
    const tasks = useSelector((state) => state.tasks.tasks || []);
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const openUpdateModal = (task) => {
        setCurrentTask(task);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentTask(null);
    };

    return (
        <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Tasks</h2>

            {tasks.length > 0 ? (
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{task.title}</p>
                                <p className="text-sm text-gray-500">{task.description}</p>
                                <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                                <p className="text-sm text-gray-500">Assigned to: {task.assignedUser}</p>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                                    onClick={() => openUpdateModal(task)}
                                >
                                    Update
                                </button>

                                <button
                                    className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this task?')) {
                                            dispatch(deleteTaskAction(task.id));
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No tasks available.</p>
            )}

            {isModalOpen && currentTask && (
                <Modal onClose={closeModal}>
                    <UpdateTask task={currentTask} onUpdate={closeModal} />
                </Modal>
            )}
        </div>
    );
};

export default Tasks;

// Note: UpdateTask form remains in '../forms/UpdateTask' and need not be changed here.
