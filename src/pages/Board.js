import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { TaskProvider } from '../context/TaskContext';

function Board() {
  const [boards, setBoards] = useState([]);
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/board/getAll`,
          { withCredentials: true },
        );

        if (response.data || response.data.statusCode === 200) {
          setBoards(response.data.data);
        } else {
          console.error('Failed to fetch boards:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    fetchBoard();
  }, []);

  const createBoard = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/board/c`,
        {
          title: newBoardTitle,
          description: newBoardDescription,
        },
        { withCredentials: true },
      );
      if (response.data || response.data.statusCode === 200) {
        setBoards([response.data.data, ...boards]);
        setShowCreateBoard(false);
        setNewBoardTitle('');
        setNewBoardDescription('');
      }
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/board/d/${boardId}`,
        { withCredentials: true },
      );
      if (response.status === 200) {
        setBoards(boards.filter((board) => board._id !== boardId));
      }
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">My Boards</h2>
      <div className="w-full flex flex-wrap gap-4 my-10">
        <button
          className="w-72 h-44 rounded-lg bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-500"
          onClick={() => setShowCreateBoard(true)}
        >
          +
        </button>

        {boards.map((board) => (
          <TaskProvider key={board._id} boardId={board._id}>
            <Link
              to={`/dd/board/${board._id}`}
              key={board._id}
              className="relative w-72 h-44 rounded-lg bg-red-200 p-6"
            >
              <h3 className="font-bold">{board.title}</h3>
              <p>{board.description}</p>
              <button
                className="absolute z-20 bottom-2 right-2 text-gray-500 p-2 rounded-full hover:bg-red-700 hover:text-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBoard(board._id);
                }}
              >
                <FaTrash size={16} />
              </button>
            </Link>
          </TaskProvider>
        ))}
      </div>

      {/* Popup for creating a new board */}
      {showCreateBoard && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Create New Board</h3>
            <input
              type="text"
              placeholder="Board Title"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <textarea
              placeholder="Board Description"
              value={newBoardDescription}
              onChange={(e) => setNewBoardDescription(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowCreateBoard(false)}
                className="mr-2 px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={createBoard}
                className="px-4 py-2 bg-purple-500 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;
