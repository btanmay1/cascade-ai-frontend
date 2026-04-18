import React from 'react';

function ScoreCard({ scoreData }) {
  const score = scoreData?.healthScore;
  const isLoading = score === undefined || score === null;
  
  const getStatusColor = (s) => {
    if (s <= 40) return '#ef4444';
    if (s <= 70) return '#fbbf24'; // warm yellow
    return '#10b981'; // green
  };
  
  const statusColor = !isLoading ? getStatusColor(score) : 'transparent';

  const sleepHrs = scoreData?.sleepScore ? (scoreData.sleepScore / 10).toFixed(1) + 'h' : '7.2h';
  const focusPct = scoreData?.focusScore ? scoreData.focusScore + '%' : '82%';
  const steps = scoreData?.activityScore ? (scoreData.activityScore * 100) : '6.4k';

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '2rem'
    }}>
      {/* Left Side: Score */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: '200px' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Cascade Score
        </h3>
        
        {isLoading ? (
          <div style={{ color: '#94a3b8', fontSize: '1.25rem', margin: '1rem 0' }}>Loading...</div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '64px', fontWeight: '800', color: '#8b5cf6', lineHeight: '1', letterSpacing: '-0.02em' }}>
                {score}
              </span>
              <span style={{ color: '#94a3b8', fontWeight: '600', fontSize: '1.25rem' }}>/ 100</span>
            </div>
            
            <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', marginTop: '1rem', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: `${score}%`, 
                backgroundColor: statusColor,
                borderRadius: '4px',
                transition: 'width 1s ease-out'
              }} />
            </div>
          </>
        )}
      </div>

      {/* Right Side: Stat Pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, maxWidth: '300px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#eff6ff', padding: '0.75rem 1.25rem', borderRadius: '999px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
          <span style={{ color: '#1e3a8a', fontWeight: '600', fontSize: '0.95rem' }}>{sleepHrs} Sleep</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#f5f3ff', padding: '0.75rem 1.25rem', borderRadius: '999px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#8b5cf6' }} />
          <span style={{ color: '#4c1d95', fontWeight: '600', fontSize: '0.95rem' }}>{focusPct} Focus</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#ecfdf5', padding: '0.75rem 1.25rem', borderRadius: '999px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
          <span style={{ color: '#064e3b', fontWeight: '600', fontSize: '0.95rem' }}>{steps} Steps</span>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
