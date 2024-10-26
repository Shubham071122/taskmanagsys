import React, { useContext, useState, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useParams } from 'react-router-dom';

const TaskFormModal = ({ task, onClose, isModalOpen }) => {
  const { addTask, updateTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('Todo');
  const [assignee, setAssignee] = useState('');
  const { boardId } = useParams();

  const formatDueDateForInput = (dueDate) => {
    const parts = dueDate.split('/'); // Assuming the input format is DD/MM/YYYY
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to YYYY-MM-DD
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(formatDueDateForInput(task.dueDate));
      setPriority(task.priority);
      setStatus(task.status);
      setAssignee(task.assignee);
    }
  }, [task]);
  console.log('ttt:', task);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      updateTask(task._id, {
        title,
        description,
        dueDate,
        priority,
        assignee,
        status,
      });
      onClose();
    } else {
      addTask(title, description, status, boardId, dueDate, priority, assignee);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">
          {task ? 'Edit Task' : 'Create Task'}
        </h2>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="text"
          value={assignee}
          placeholder="Assignee"
          onChange={(e) => setAssignee(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 mb-4 w-full"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 mb-4 w-full"
        >
          <option value="Todo">To Do</option>
          <option value="Inprogress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <div className="w-full flex items-center justify-end gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded px-4 "
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 p-2 rounded px-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskFormModal;
