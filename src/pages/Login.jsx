import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/client';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await login({ email, password });
      const token = response.token || response.data?.token;
      
      if (token) {
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } else {
        const msg = 'Login failed: No token received from server';
        setError(msg);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Invalid email or password';
      setError(errorMessage);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem', backgroundColor: '#f8f7f4' }}>
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '3rem 2.5rem', 
        borderRadius: '20px', 
        width: '100%', 
        maxWidth: '420px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Mascot / Icon */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#8b5cf6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
        }}>
          ⚡
        </div>

        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '0.5rem', 
          fontSize: '1.75rem', 
          color: '#1a1a2e',
          fontWeight: '800',
          letterSpacing: '-0.025em'
        }}>
          Welcome back to Cascade
        </h1>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2.5rem', fontSize: '0.95rem', fontWeight: '500' }}>
          Your personal life optimization system
        </p>
        
        {error && (
          <div style={{ width: '100%', backgroundColor: '#fff8ed', border: '1px solid #fbbf24', color: '#b45309', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: '500' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#334155', fontSize: '0.9rem', fontWeight: '600' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={{ 
                width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff', color: '#1a1a2e', fontSize: '1rem', outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={(e) => { e.target.style.borderColor = '#8b5cf6'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#334155', fontSize: '0.9rem', fontWeight: '600' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ 
                width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff', color: '#1a1a2e', fontSize: '1rem', outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={(e) => { e.target.style.borderColor = '#8b5cf6'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <button 
            type="submit" 
            style={{ 
              width: '100%', padding: '14px 16px', marginTop: '0.5rem', 
              backgroundColor: '#8b5cf6', 
              color: 'white', 
              border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold',
              transition: 'background-color 0.2s, transform 0.1s',
              boxShadow: '0 2px 8px rgba(139, 92, 246, 0.25)'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#7c3aed'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#8b5cf6'}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            Log In
          </button>
        </form>
        <p style={{ marginTop: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.95rem', fontWeight: '500' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#8b5cf6', textDecoration: 'none', fontWeight: '700', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.target.style.color = '#7c3aed'}
            onMouseOut={(e) => e.target.style.color = '#8b5cf6'}
          >
            Try Cascade Free
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
