import React from 'react';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div className="main-header">
          <h1>Welcome back, Moaaz 👋</h1>
          <p>Here you can access all your study materials and track your progress.</p>
          <button className="primary-button">Upload your files</button>
        </div>
      </main>
    </div>
  );
}

export default App;
