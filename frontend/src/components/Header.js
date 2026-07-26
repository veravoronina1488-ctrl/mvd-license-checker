import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FaHome, FaSignOutAlt, FaTachometerAlt} from 'react-icons/fa';

function Header({user, onLogout}) {
  const navigate = useNavigate();
  return (
    <header className="gradient-header text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaHome /> МВД РК
        </Link>
        <nav className="flex items-center gap-8">
          {user?.role === 'admin' && <Link to="/admin/dashboard" className="flex items-center gap-2"><FaTachometerAlt /> Админ</Link>}
          {user ? (
            <button onClick={() => {onLogout();navigate('/');}} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
              <FaSignOutAlt /> Выход
            </button>
          ) : (
            <Link to="/login" className="btn-primary">Вход</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;