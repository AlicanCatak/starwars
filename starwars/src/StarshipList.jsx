// src/StarshipList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Ship from '../public/ship.png';

const StarshipList = () => {
  const [starships, setStarships] = useState([]); // Yıldız gemilerini saklamak için state
  const [page, setPage] = useState(1); // Şu anki sayfa numarası
  const [loading, setLoading] = useState(false); // Veri yükleniyor mu kontrolü
  const [searchTerm, setSearchTerm] = useState(''); // Arama terimi

  useEffect(() => {
    // API'den yıldız gemilerini çekiyoruz
    const fetchStarships = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
        const data = await response.json();
        setStarships((prevStarships) => [...prevStarships, ...data.results]);
      } catch (error) {
        console.error('Error fetching starships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStarships();
  }, [page]);

  // Arama terimine göre filtreleme işlemi
  const filteredStarships = starships.filter(
    (starship) =>
      starship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      starship.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ textAlign: 'center', color: '#e1e1e6' }}>
      <h1>Star Wars Yıldız Gemileri</h1>

      {/* Arama Çubuğu */}
      <input
        type="text"
        placeholder="Name / Model"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px',
          borderRadius: '8px',
          border: '2px solid #e1e1e6',
          backgroundColor: '#2d2d44',
          color: '#fff',
          outline: 'none',
          marginBottom: '20px',
          marginRight: '10px',
        }}
      />
      

      <div className="starship-grid">
        {filteredStarships.map((starship) => (
          <div key={starship.name} className="starship-card">
            <Link to={`/starship/${starship.url.split('/').slice(-2, -1)[0]}`} style={{ textDecoration: 'none', color: '#e1e1e6' }}>
              <img src={Ship} alt="" />
              <h2>{starship.name}</h2>
              <p><span>Model:</span> {starship.model}</p>
              <p><span>Hyperdrive Rating:</span> {starship.hyperdrive_rating}</p>
            </Link>
          </div>
        ))}
      </div>

      {loading && <p>Yükleniyor...</p>}
      
      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#ff005c',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        disabled={loading}
      >
        Daha Fazla Yükle
      </button>
    </div>
  );
};

export default StarshipList;
