'use client'
import TaskList from './components/TaskList';
import { useState, useEffect } from 'react';

export default function Home() {

  const [filter, setFilter] = useState(1);

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('newTask', newTask);
  }, [newTask]);


  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  
  const handleChecked = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleRemoveTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };


  const handleRemoveCompletedTasks = () => {
    const updatedTasks = tasks.filter(task => !task.completed);
    setTasks(updatedTasks);
  };

  
  const handleFilter = (type) => {
    setFilter(type);
  }



  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do?"
          value={newTask}
          onChange={handleTaskChange}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">

        <TaskList
          tasks={tasks}
          removeTask={handleRemoveTask}
          handleChecked={handleChecked}
          filter={filter}
        />

        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>{tasks.length} items</span>
          <div>
            <button
              onClick={() => handleFilter(1)}
              className={`ml-2 ${filter === 1 ? 'text-white mr-2' : 'text-gray-400 mr-2'}`}
            >
              All
            </button>
            <button onClick={() => handleFilter(2)}
              className={`ml-2 ${filter === 2 ? 'text-white mr-2' : 'text-gray-400 mr-2'}`}>
              Active
            </button>
            <button
              onClick={() => handleFilter(3)}
              className={`ml-2 ${filter === 3 ? 'text-white mr-2' : 'text-gray-400 mr-2'}`}>
              Completed
            </button>
          </div>


          <button
            onClick={handleRemoveCompletedTasks}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
