// src/starshipDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Ship from '../public/ship.png';

const StarshipDetails = () => {
  const { id } = useParams(); // URL'deki 'id' parametresini alıyoruz
  const [starship, setStarship] = useState(null); // Yıldız gemisi verisini saklamak için state
  const navigate = useNavigate(); // Geriye yönlendirme için navigate fonksiyonu

  useEffect(() => {
    // Yıldız gemisi detaylarını API'den çekiyoruz
    fetch(`https://swapi.dev/api/starships/${id}/`)
      .then((response) => response.json())
      .then((data) => setStarship(data))
      .catch((error) => console.error('Error fetching starship details:', error));
  }, [id]);

  if (!starship) {
    // Veri yüklenirken kullanıcıya gösterilecek mesaj
    return <p>Yükleniyor...</p>;
  }

  return (
    <div style={{ color: '#e1e1e6', padding: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#ff005c', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
        Geri
      </button>
      <img src={Ship} alt="ship" style={{ width: '500px', height: '400px', marginBottom: '30px' }}/>
      <h1>{starship.name}</h1>
      <p><span>Model:</span> {starship.model}</p>
      <p><span>Üretici:</span> {starship.manufacturer}</p>
      <p><span>Uzunluk:</span> {starship.length}</p>
      <p><span>Mürettebat:</span> {starship.crew}</p>
      <p><span>Yolcu Kapasitesi:</span> {starship.passengers}</p>
      <p><span>Kargo Kapasitesi:</span> {starship.cargo_capacity}</p>
      <p><span>Hiper Sürücü Derecesi:</span> {starship.hyperdrive_rating}</p>
      <p><span>Yıldız Gemisi Sınıfı:</span> {starship.starship_class}</p>
    </div>
  );
};

export default StarshipDetails;
