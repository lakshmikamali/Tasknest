import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);

  // ⏱ timers stored per task: { taskId: seconds }
  const [timers, setTimers] = useState({});

  // fetch tasks
  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(res => setTasks(res.data));
  }, []);

  const refreshTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);
  };

  //  start timer for a specific task
const startPomodoro = async (task) => {
  const taskId = task._id;

  try {
    // 1. update backend FIRST
    await axios.put(`http://localhost:5000/api/tasks/${taskId}/start`);

    // 2. refresh tasks FIRST
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);

    // 3. THEN set timer (after UI stabilizes)
    setTimers(prev => ({
      ...prev,
      [taskId]: 1500
    }));

  } catch (err) {
    console.error("Start failed:", err);
  }
};
  // ⏱ timer engine (runs once)
  useEffect(() => {
  const interval = setInterval(() => {
    setTimers(prev => {
      const updated = { ...prev };

      Object.keys(updated).forEach(taskId => {
        if (updated[taskId] > 0) {
          updated[taskId] -= 1;

          if (updated[taskId] === 0) {
            axios.put(`http://localhost:5000/api/tasks/${taskId}/complete`);
            delete updated[taskId];
          }
        }
      });

      return updated;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);
  const todoTasks = tasks.filter(t => t.status === "To Do");
  const inProgressTasks = tasks.filter(t => t.status === "In Progress");
  const completedTasks = tasks.filter(t => t.status === "Completed");

  return (
    <div className="grid grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen">

      {/* 🟡 TO DO */}
      <div className="bg-white rounded-xl shadow-lg p-4 border-t-4 border-blue-500">
        <h2 className="font-bold text-yellow-600 mb-4 text-lg">To Do</h2>

        {todoTasks.map(task => (
          
          <div key={task._id} className="bg-white p-3 mb-2 rounded shadow">
            {timers[task._id] !== undefined && (
  <div className="text-xs text-purple-600 mt-1">
    ⏱ {Math.floor(timers[task._id] / 60)}:
    {String(timers[task._id] % 60).padStart(2, '0')}
  </div>
)}

            <h3 className="font-bold">{task.title}</h3>
            <p className="text-sm">{task.description}</p>

            <button
              onClick={() => startPomodoro(task)}
              className="bg-blue-500 text-white px-2 py-1 text-xs mt-2 rounded"
            >
              Start Pomodoro
            </button>

          </div>
        ))}
      </div>

      {/* 🔵 IN PROGRESS */}
      <div className="bg-white rounded-xl shadow-lg p-4 border-t-4 border-yellow-500">
        <h2 className="font-bold text-blue-600 mb-4 text-lg">In Progress</h2>

        {inProgressTasks.map(task => (
          <div key={task._id} className="bg-white p-3 mb-2 rounded shadow">
            {timers[task._id] !== undefined && (
  <div className="text-xs text-purple-600 mt-1">
    ⏱ {Math.floor(timers[task._id] / 60)}:
    {String(timers[task._id] % 60).padStart(2, '0')}
  </div>
)}

            <h3 className="font-bold">{task.title}</h3>
            <p className="text-sm">{task.description}</p>

          
            

            <button
              onClick={async () => {
                await axios.put(`http://localhost:5000/api/tasks/${task._id}/complete`);
                await refreshTasks();
              }}
              className="bg-green-500 text-white px-2 py-1 text-xs mt-2 rounded"
            >
              Complete
            </button>

          </div>
        ))}
      </div>

      {/* 🟢 COMPLETED */}
      <div className="bg-white rounded-xl shadow-lg p-4 border-t-4 border-green-500">
        <h2 className="font-bold text-green-600 mb-4 text-lg">Completed</h2>

        {completedTasks.map(task => (
          <div key={task._id} className="bg-white p-3 mb-2 rounded shadow opacity-70">

            <h3 className="font-bold line-through">{task.title}</h3>
            <p className="text-sm">{task.description}</p>

            <div className="text-xs text-green-600 mt-1">
              ✔ Done
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}