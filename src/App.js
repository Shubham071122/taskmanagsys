import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext.js';
import { TaskProvider } from './context/TaskContext.js';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import TaskBoard from './pages/TaskBoard';
import Home from './pages/Home.js';
import Signup from './pages/Signup.js';
import Board from './pages/Board.js';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Toaster/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Protected route for Dashboard */}
            <Route
              path="/dd/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route
                index 
                element={
                  <PrivateRoute>
                    <Board />
                  </PrivateRoute>
                }
              />
              <Route
                path="board/:boardId"
                element={
                  <PrivateRoute>
                    <TaskBoard />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
