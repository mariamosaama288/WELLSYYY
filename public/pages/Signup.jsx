import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'WELLSY - Sign Up';
  }, []);

  function validateEmail(e) {
    // very simple email check
    return /\S+@\S+\.\S+/.test(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password || !confirmPassword) {
      setError('Please fill required fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (email && !validateEmail(email)) {
      setError('Email looks invalid.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === username.trim())) {
      setError('Username already taken.');
      return;
    }

    const user = {
      username: username.trim(),
      password, // demo only: DO NOT store plaintext passwords in real apps
      phone: phone.trim(),
      email: email.trim()
    };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Account created successfully (demo). You can now log in.');
    navigate('/login');
  }

  return (
    <div className="card">
  <h1 className="title">Sign Up</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className={`field ${username ? 'active' : ''}`}>
          <input id="username" name="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
          <label htmlFor="username">Username</label>
        </div>

        <div className={`field ${password ? 'active' : ''}`}>
          <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} />
        <label htmlFor="password">Password</label>
          <span className="toggle-eye" onClick={() => setShowPassword(s => !s)}>{showPassword ? '🙈' : '👁'}</span>
        </div>

        <div className={`field ${confirmPassword ? 'active' : ''}`}>
          <input id="confirmPassword" name="confirmPassword" type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <span className="toggle-eye" onClick={() => setShowConfirm(s => !s)}>{showConfirm ? '🙈' : '👁'}</span>
        </div>
        <div className={`field ${phone ? 'active' : ''}`}>
          <input id="phone" name="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
          <label htmlFor="phone">Phone</label>
      </div>

        <div className={`field ${email ? 'active' : ''}`}>
          <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <label htmlFor="email">Email</label>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="actions">
          <button type="submit" className="btn">Create Account</button>
        </div>
      </form>

      <p className="hint">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}