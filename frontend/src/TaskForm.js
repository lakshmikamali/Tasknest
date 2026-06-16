// src/TaskForm.js
import React, { useState } from 'react';
import axios from 'axios';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [tag, setTag] = useState('');
  
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
await axios.post('http://localhost:5000/api/tasks', {
    title,
    description: desc,
    dueDate,
    priority,
    tag,
    
});
setMsg('Task added!');
setTitle('');
setDesc('');
setDueDate('');
setPriority('Normal');
setTag('');
    } catch (error) {
      setMsg('Failed. Check server.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 to-pink-200 shadow-lg rounded-xl w-80 p-6">
      <h2 className="font-bold text-pink-700 text-2xl mb-2">Create Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}
          className="border rounded p-2" required />
        <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)}
          className="border rounded p-2" />
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
          className="border rounded p-2" />
        <select value={priority} onChange={e => setPriority(e.target.value)} className="border rounded p-2">
          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
        </select>
        
        <input placeholder="Tag" value={tag} onChange={e => setTag(e.target.value)}
          className="border rounded p-2" />
        <button type="submit" className="bg-pink-400 hover:bg-pink-500 text-white rounded py-2 mt-2">Save Task</button>
        {msg && <div className="text-sm text-pink-800 mt-1">{msg}</div>}
      </form>
    </div>
  );
}

