import React, {useState, useEffect} from 'react';
import {FaCar, FaMoneyBillWave} from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${API_URL}/admin/stats`, {headers: {Authorization: `Bearer ${token}`}}).then(r => setStats(r.data)).catch(console.error);
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Админ-панель</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card"><div className="flex items-center gap-4"><FaCar className="text-4xl text-blue-600" /><div><p className="text-gray-600">Всего водителей</p><p className="text-3xl font-bold">{stats?.total_drivers || 0}</p></div></div></div>
        <div className="card"><div className="flex items-center gap-4"><FaMoneyBillWave className="text-4xl text-yellow-600" /><div><p className="text-gray-600">Всего штрафов</p><p className="text-3xl font-bold">{stats?.total_fines || 0}</p></div></div></div>
      </div>
    </div>
  );
}

export default AdminDashboard;