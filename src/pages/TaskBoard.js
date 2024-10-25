import React, { useContext, useState, useEffect } from 'react';
import TaskContext from '../context/TaskContext.js';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import { useParams } from 'react-router-dom';
import DropArea from '../components/DropArea.js';

const TaskBoard = () => {
  const { tasks, fetchTasks, updateTask } = useContext(TaskContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('');
  const boardId = useParams().boardId;
  const stages = ['Todo', 'Inprogress', 'Completed'];
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    if (boardId) {
      fetchTasks(boardId);
    }
  }, []);

  const openModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  const categorizedTasks = {
    Todo: tasks.filter(
      (task) =>
        task.status === 'Todo' &&
        task.board === boardId &&
        (!priorityFilter || task.priority === priorityFilter),
    ),
    Inprogress: tasks.filter(
      (task) =>
        task.status === 'Inprogress' &&
        task.board === boardId &&
        (!priorityFilter || task.priority === priorityFilter),
    ),
    Completed: tasks.filter(
      (task) =>
        task.status === 'Completed' &&
        task.board === boardId &&
        (!priorityFilter || task.priority === priorityFilter),
    ),
  };

  const onDrop = (status, postion) => {
    console.log(
      `${activeCard} is going to place into ${status} and at positon ${postion}`,
    );
    if (!activeCard) return;

    const updatedTask = {
      ...tasks.find((task) => task._id === activeCard),
      status,
    };
    updateTask(activeCard, updatedTask);
    setActiveCard(null);
  };

  const handleFilterChange = (value) => {
    setPriorityFilter(value);
  };

  return (
    <div className="task-board">
      <div className="flex items-center justify-between mb-5 px-10">
        <h1 className="text-2xl font-bold">Task Board</h1>
        <div className='flex items-center gap-2'>
          <button
            className="bg-blue-500 text-white rounded px-2 py-1"
            onClick={() => openModal(null)}
          >
            + Add Card
          </button>
          <div className='flex items-center gap-2'>
            <p>Filter by Priority:</p>
            <select
          onChange={(e) => handleFilterChange(e.target.value)}
          value={priorityFilter}
          className="border p-1 rounded"
        >
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-5">
        {stages.map((stage) => (
          <div
            key={stage}
            className={`w-1/3 p-4 rounded-lg ${
              stage === 'Todo'
                ? 'bg-blue-100'
                : stage === 'Inprogress'
                ? 'bg-yellow-100'
                : 'bg-green-100'
            }`}
          >
            <h2 className="text-xl font-bold capitalize text-center text-violet-950">
              {stage.replace(/([A-Z])/g, ' $1')}
            </h2>

            <DropArea onDrop={() => onDrop(stage)} />
            {categorizedTasks[stage].map((task,index) => (
              <div key={task._id} className="mt-4">
                <TaskCard
                  task={task}
                  openModal={openModal}
                  setActiveCard={setActiveCard}
                />
                <DropArea onDrop={() => onDrop(stage,index+1)} />
              </div>
            ))}
          </div>
        ))}
      </div>
      {showModal && (
        <TaskFormModal
          task={selectedTask}
          onClose={closeModal}
          boardId={boardId}
        />
      )}
    </div>
  );
};

export default TaskBoard;

