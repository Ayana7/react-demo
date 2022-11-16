import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import ClassComponentDemo from './pages/ClassComponentDemo'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import About from './components/About';
import MembersPage from './components/MembersPage';
function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<ClassComponentDemo />} />
            <Route path="/about" element={<About />} />
            <Route path="/members" element={<MembersPage />} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
