import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FaUser, FaLock} from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function LoginPage({setAuthToken, setUser}) {
  const [email, setEmail] = useState('admin@mvd.kz');
  const [password, setPassword] = useState('admin123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {email, password});
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setAuthToken(response.data.token);
      setUser(response.data.user);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
      <div className="card max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Вход в систему</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required />
          {error && <div className="p-3 bg-red-100 text-red-700 rounded">⚠️ {error}</div>}
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Вход...' : 'Войти'}</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;