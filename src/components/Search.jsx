import React, { useState } from 'react';

const Search = ({ setSearch, submitTask }) => {
  const [newTask, setNewTask] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    submitTask(newTask);
    setNewTask('');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-100 rounded-xl shadow-lg flex flex-col items-center mb-6">
      <div className="mb-4 w-full relative">
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchQuery(e.target.value);
          }}
          placeholder="Search tasks..."
          className="w-full p-3 pl-10 bg-white border-0 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 text-gray-800"
          id="search"
        />
        <label
          htmlFor="search"
          className="absolute left-10 top-[-0.5rem] text-blue-600 text-xs bg-white px-1"
        >
          Search tasks
        </label>
        {searchQuery === '' && (
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>

      <form onSubmit={handleAddTask} className="flex flex-col gap-3 w-full">
        <div className="relative">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="w-full p-3 pl-10 bg-white border-0 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 text-gray-800"
            id="newTask"
          />
          <label
            htmlFor="newTask"
            className="absolute left-10 top-[-0.5rem] text-blue-600 text-xs bg-white px-1"
          >
            Add a new task
          </label>
          {newTask === '' && (
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </div>
        <button
          type="submit"
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md shadow-md hover:from-blue-600 hover:to-blue-800 focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all duration-300"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Search;