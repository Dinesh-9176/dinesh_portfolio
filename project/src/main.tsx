import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import StartupJourneyPage from './pages/StartupJourneyPage';
import MyWorkPage from './pages/MyWorkPage';
import TestimonialsPage from './pages/TestimonialsPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/startup-journey" element={<StartupJourneyPage />} />
        <Route path="/my-work" element={<MyWorkPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);