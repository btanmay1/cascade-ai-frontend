import React, { useEffect, useState } from 'react';

function ScoreChart({ history }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const chartData = (!history || history.length === 0) 
    ? days.map((day) => ({
        date: day,
        score: Math.floor(Math.random() * 40) + 40
      }))
    : history;

  const displayData = chartData.slice(-7);

  return (
    <div style={{ 
      height: '100%', 
      minHeight: '350px',
      width: '100%',
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3 style={{ margin: '0 0 2rem 0', color: '#1a1a2e', fontWeight: '700', fontSize: '1.25rem' }}>This Week</h3>
      
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'flex-end', 
        justifyContent: 'space-between',
        paddingTop: '2rem',
        gap: '0.5rem'
      }}>
        {displayData.map((item, index) => {
          const dateObj = new Date(item.date);
          const label = isNaN(dateObj.getTime()) ? item.date : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
          const isToday = index === displayData.length - 1;
          
          return (
            <div key={index} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              flex: 1,
              height: '100%'
            }}>
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'flex-end', 
                width: '100%', 
                justifyContent: 'center',
                backgroundColor: '#f1f5f9',
                borderRadius: '8px',
                maxWidth: '40px',
                position: 'relative'
              }}>
                <div style={{ 
                  width: '100%', 
                  height: animated ? `${item.score}%` : '0%', 
                  backgroundColor: isToday ? '#7c3aed' : '#8b5cf6',
                  borderRadius: '8px',
                  transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <span style={{ 
                    position: 'absolute', 
                    top: '-24px', 
                    color: '#64748b', 
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    opacity: animated ? 1 : 0,
                    transition: 'opacity 0.5s ease 0.5s'
                  }}>
                    {item.score}
                  </span>
                </div>
              </div>
              <span style={{ 
                marginTop: '1rem', 
                color: isToday ? '#1a1a2e' : '#94a3b8', 
                fontSize: '0.8rem',
                fontWeight: isToday ? '700' : '600',
                textTransform: 'uppercase'
              }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScoreChart;
