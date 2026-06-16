// src/App.js
import React from 'react';
import WellnessSection from './WellnessSection';
import FocusTimer from './FocusTimer';
import TaskForm from './TaskForm';
import TaskDashboard from './TaskDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-rose-100 font-sans relative pb-20">
      {/* Floral Motif SVG Background */}
      <svg className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 800 600" fill="none">
        <circle cx="100" cy="100" r="75" fill="#E0BBE4" opacity="0.14"/>
        <ellipse cx="700" cy="550" rx="70" ry="35" fill="#A0E7E5" opacity="0.10"/>
        <path d="M500,400 Q520,440 550,430 Q582,420 570,380 Q558,340 520,360 Q510,370 500,400Z" fill="#FFD6A5" opacity="0.12"/>
      </svg>

      <header className="relative z-10 bg-blue-200 py-6 rounded-b-2xl shadow mb-5 text-center">
        <h1 className="text-4xl text-indigo-700 font-bold mb-3">TaskNest</h1>
        <p className="text-indigo-500 text-lg">
          Track, organize and improve your study & wellness!
        </p>
      </header>

      <div className="relative z-10 flex flex-wrap justify-center gap-8 p-6">
        <WellnessSection />
        <FocusTimer />
        <TaskForm />
        <TaskDashboard />
      </div>
    </div>
  );
}

export default App;