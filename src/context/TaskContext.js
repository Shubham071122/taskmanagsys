import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workflowStages, setWorkflowStages] = useState([
    { id: 'Todo', name: 'To Do' },
    { id: 'Inprogress', name: 'In Progress' },
    { id: 'Completed', name: 'Completed' },
  ]);

  const fetchTasks = async (boardId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/taskcard/get-all/${boardId}`,
        { withCredentials: true },
      );
      if (response.status === 200) {
        setTasks(response.data.data);
        // toast.success('Tasks fetched successfully');
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (
    title,
    description,
    status,
    boardId,
    dueDate,
    priority,
    assignee,
  ) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/taskcard/c`,
        { title, description, status, boardId, dueDate, priority, assignee },
        { withCredentials: true },
      );

      if (response.status === 201) {
        setTasks((prevTasks) => [response.data.data, ...prevTasks])
        fetchTasks(boardId);
        toast.success('Task added successfully');
      } else {
        console.error('Failed to add task:', response.data);
        toast.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Error adding task');
    }
  };

  const updateTask = async (cardId, updatedTask) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/taskcard/u/${cardId}`,
        updatedTask,
        { withCredentials: true },
      );
      // console.log('updateTask:', response);
      if (response.status === 200) {
        setTasks(
          tasks.map((task) =>
            task._id === cardId ? { ...task, ...updatedTask } : task,
          ),
        );
        toast.success('Task updated successfully');
      } else {
        toast.error('Failed to update task');
      }
    } catch (error) {
      console.log("Error while updating task:",error);
      toast.error('Error updating task');
    }
  };

  const deleteTask = async (cardId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/taskcard/d/${cardId}`,
        { withCredentials: true },
      );
      if(response.status === 200){
        setTasks(tasks.filter((task) => task._id !== cardId));
        toast.success('Task deleted successfully');
      }else{
        toast.error('Failed to delete task');
      }
    } catch (error) {
      console.log("Error while deleting task:",error);
      toast.error('Error deleting task');
    }
  };



  return (
    <TaskContext.Provider
      value={{
        tasks,
        workflowStages,
        loading,
        error,
        addTask,
        updateTask,
        deleteTask,
        fetchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
