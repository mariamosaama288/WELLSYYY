import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'WELLSY - Login';
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password) {
      setError('Please fill all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username.trim());
    if (!user) {
      setError('User not found. Please sign up.');
      return;
    }
    if (user.password !== password) {
      setError('Incorrect password.');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify({ username: user.username, email: user.email }));
    navigate('/homepage');
  }

  return (
  <div className="card">
      <h1 className="main-title">WELLSY</h1>
      <h2 className="sub-title">Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className={`field ${username ? 'active' : ''}`}>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <label htmlFor="username">Username</label>
        </div>

        <div className={`field ${password ? 'active' : ''}`}>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <span className="toggle-eye" onClick={() => setShowPassword(s => !s)}>
            {showPassword ? '🙈' : '👁'}
          </span>
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="btn">Login</button>
      </form>

      <p className="hint">Don’t have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}