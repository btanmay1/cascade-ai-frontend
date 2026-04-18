import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScoreCard from '../components/ScoreCard';
import ScoreChart from '../components/ScoreChart';
import Insights from '../components/Insights';
import { computeScore } from '../api/client';

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [scoreData, setScoreData] = useState(null);
  const [error, setError] = useState(null);

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Get 7+ hours of sleep tonight', category: 'Health', priority: 'high', done: false },
    { id: 2, text: 'Block 2 hours for deep work', category: 'Focus', priority: 'medium', done: false },
    { id: 3, text: 'Take a 20 min walk', category: 'Activity', priority: 'medium', done: false }
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/');
      return;
    }

    const fetchScore = async () => {
      try {
        const data = await computeScore();
        setScoreData(data);
      } catch (err) {
        console.error('Failed to compute score:', err);
        setError('Failed to load dashboard data.');
        if (err?.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', month: 'long', day: 'numeric' 
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8f7f4' }}>
        <h2 style={{ color: '#8b5cf6', fontWeight: '600', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
          Loading Cascade...
        </h2>
      </div>
    );
  }

  const healthScore = scoreData?.healthScore || 0;
  const history = scoreData?.history || [];
  const bottlenecks = scoreData?.bottlenecks || [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f7f4' }}>
      
      {/* Sidebar */}
      <aside style={{ 
        width: '240px', 
        backgroundColor: '#f0eeea', 
        borderRight: '1px solid #e2e8f0',
        display: 'flex', 
        flexDirection: 'column',
        padding: '2rem 1.5rem',
        position: 'fixed',
        height: '100vh'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#8b5cf6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>⚡</div>
          <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1a1a2e', letterSpacing: '-0.025em' }}>Cascade</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <NavItem active icon="🏠" label="Today" />
          <NavItem icon="📅" label="This Week" />
          <NavItem icon="📊" label="Insights" />
          <NavItem icon="⚡" label="Actions" />
          <NavItem icon="⚙️" label="Settings" />
        </nav>

        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a2e' }}>Tanmay</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>user@example.com</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', padding: '0.5rem', backgroundColor: 'transparent', color: '#64748b', 
              border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem',
              textAlign: 'left', transition: 'background-color 0.2s, color 0.2s'
            }}
            onMouseOver={(e) => { e.target.style.backgroundColor = '#e2e8f0'; e.target.style.color = '#ef4444'; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#64748b'; }}
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ 
        flex: 1, 
        backgroundColor: '#ffffff',
        marginLeft: '240px',
        padding: '3rem 4rem',
        borderTopLeftRadius: '24px',
        borderBottomLeftRadius: '24px',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.02)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem'
      }}>
        
        {/* Top Bar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a2e', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>Today</h1>
            <p style={{ color: '#64748b', fontSize: '1rem', fontWeight: '500', margin: 0 }}>{currentDate}</p>
          </div>
          <button 
            onClick={() => navigate('/daily-input')}
            style={{ 
            backgroundColor: '#8b5cf6', color: 'white', padding: '0.75rem 1.5rem', 
            borderRadius: '999px', border: 'none', fontWeight: '700', cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(139,92,246,0.25)', transition: 'transform 0.1s'
          }}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            Daily Check-in
          </button>
        </header>

        {error && (
          <div style={{ backgroundColor: '#fff8ed', border: '1px solid #fbbf24', color: '#b45309', padding: '1rem', borderRadius: '8px', fontWeight: '500' }}>
            {error}
          </div>
        )}

        {/* Section A: Score Hero */}
        <ScoreCard scoreData={scoreData} />

        {/* Section E: Bottleneck Alert */}
        {healthScore < 70 && (
          <div style={{
            backgroundColor: '#fff8ed',
            padding: '1.5rem 2rem',
            borderRadius: '12px',
            borderLeft: '4px solid #f97316',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#f97316', fontWeight: 'bold' }}>⚠️</span>
              <h4 style={{ margin: 0, color: '#9a3412', fontWeight: '700', fontSize: '1rem' }}>Main bottleneck detected today</h4>
            </div>
            <p style={{ margin: '0 0 0 1.75rem', color: '#9a3412', opacity: 0.8, fontSize: '0.95rem', fontWeight: '500' }}>
              {bottlenecks.length > 0 ? bottlenecks[0].insight : "Your recent sleep metrics are significantly lowering your overall score. Prioritize rest."}
            </p>
            <a href="#" style={{ margin: '0.5rem 0 0 1.75rem', color: '#f97316', fontWeight: '600', textDecoration: 'none', fontSize: '0.9rem' }}>
              View full insights →
            </a>
          </div>
        )}

        {/* Section B & C & D */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* Today's Tasks */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>Today's Focus</h2>
              <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700' }}>
                {tasks.filter(t => !t.done).length}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {tasks.map((task) => (
                <div key={task.id} style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem 1.5rem', borderRadius: '12px',
                  backgroundColor: 'white', border: '1px solid #e2e8f0',
                  transition: 'background-color 0.2s', cursor: 'pointer'
                }}
                onClick={() => toggleTask(task.id)}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f3ff'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ 
                      width: '20px', height: '20px', borderRadius: '50%', 
                      border: task.done ? 'none' : '2px solid #cbd5e1',
                      backgroundColor: task.done ? '#8b5cf6' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: '12px'
                    }}>
                      {task.done && '✓'}
                    </div>
                    <span style={{ color: task.done ? '#94a3b8' : '#1a1a2e', fontSize: '1rem', fontWeight: '500', textDecoration: task.done ? 'line-through' : 'none' }}>
                      {task.text}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '600', backgroundColor: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '6px' }}>
                      {task.category}
                    </span>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: task.priority === 'high' ? '#f97316' : task.priority === 'medium' ? '#fbbf24' : '#10b981' }} />
                  </div>
                </div>
              ))}
              
              {/* Add Task Row */}
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1rem 1.5rem', borderRadius: '12px',
                backgroundColor: 'transparent', border: '1px dashed #cbd5e1',
                cursor: 'pointer', color: '#64748b', fontWeight: '600'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f8f7f4'; e.currentTarget.style.borderColor = '#94a3b8'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
              >
                <span>+</span> Add task
              </div>
            </div>
          </section>

          {/* Insights Row */}
          <Insights data={scoreData} />
          
          {/* Chart */}
          <ScoreChart history={history} />

        </div>
      </main>
    </div>
  );
}

// Helper component for Sidebar items
function NavItem({ active, icon, label }) {
  return (
    <div style={{ 
      display: 'flex', alignItems: 'center', gap: '0.75rem', 
      padding: '0.75rem 1rem', 
      backgroundColor: active ? '#8b5cf6' : 'transparent', 
      color: active ? 'white' : '#64748b',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.2s, color 0.2s'
    }}
    onMouseOver={(e) => { if(!active) { e.currentTarget.style.backgroundColor = '#e2e8f0'; e.currentTarget.style.color = '#1a1a2e'; } }}
    onMouseOut={(e) => { if(!active) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#64748b'; } }}
    >
      <span style={{ fontSize: '1.25rem' }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default Dashboard;
