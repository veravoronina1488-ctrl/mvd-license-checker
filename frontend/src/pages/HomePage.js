import React, {useState} from 'react';
import {FaSearch, FaCheckCircle} from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function HomePage() {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [driverData, setDriverData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/drivers/search`, {params: {license_number: licenseNumber}});
      setDriverData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка при поиске');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="gradient-header text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Проверка водительского удостоверения</h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="card max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Поиск по номеру УВ</h2>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input type="text" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} placeholder="Номер УВ" className="input-field flex-grow" />
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
              <FaSearch /> {loading ? 'Поиск...' : 'Проверить'}
            </button>
          </form>
          {error && <div className="mt-6 p-4 bg-red-100 text-red-700 rounded">⚠️ {error}</div>}
        </div>
        {driverData && (
          <div className="mt-12 card">
            <h3 className="text-2xl font-bold">Результат:</h3>
            <div className="mt-4"><FaCheckCircle className="text-green-600 text-2xl" /> <span className="text-lg">Лицензия: {driverData.driver.license_status}</span></div>
            <p className="mt-4">Водитель: {driverData.driver.first_name} {driverData.driver.last_name}</p>
            <p>Штрафов: {driverData.statistics.total_fines}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;