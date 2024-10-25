import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';

const TaskCard = ({ task, openModal,setActiveCard }) => {
  const { deleteTask, updateTask } = useContext(TaskContext);
  const handleDelete = (cardId) => {
    deleteTask(cardId);
  };

  const handleStatusChange = (newStatus) => {
    updateTask(task._id, { ...task, status: newStatus });
  };

  return (
    <div className="bg-white border border-blue-300 rounded-lg shadow-md p-4 mb-2 cursor-grab task-card" draggable onDragStart={()=>setActiveCard(task._id)} onDragEnd={()=>setActiveCard(null)}>
      <h2 className="text-lg font-semibold">{task.title}</h2>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
      <p className="text-sm text-gray-600">Priority: {task.priority}</p>
      <div className="flex justify-between mt-4">
        <div>
          <button
            onClick={() => handleDelete(task._id)}
            className="p-1 mr-2 rounded-full text-gray-400 hover:bg-gray-500 hover:text-white"
          >
            <FaRegTrashCan size={15}/>
          </button>
          <button
            onClick={() => openModal(task)}
            className="p-1 mr-2 rounded-full text-gray-400 hover:bg-gray-500 hover:text-white"
          >
            <FaRegEdit />
          </button>
        </div>
        <select
          onChange={(e) => handleStatusChange(e.target.value)}
          value={task.status}
          className="border p-1 rounded"
        >
          <option value="Todo">To Do</option>
          <option value="Inprogress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;
