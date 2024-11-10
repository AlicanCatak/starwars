import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StarshipList from './StarshipList';
import StarshipDetail from './StarshipDetail'; // Yeni dosya adı

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StarshipList />} />
        <Route path="/starship/:id" element={<StarshipDetail />} /> {/* Yolu güncelledik */}
      </Routes>
    </Router>
  );
}

export default App;
