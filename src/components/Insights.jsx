import React from 'react';

function Insights({ data }) {
  const sleepScore = data?.sleepScore ?? '-';
  const focusScore = data?.focusScore ?? '-';
  const activityScore = data?.activityScore ?? '-';

  const MoonIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );

  const TargetIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  );

  const BoltIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );

  const Card = ({ title, value, status, statusColor, Icon }) => (
    <div style={{
      flex: '1 1 200px',
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#64748b', fontWeight: '600', fontSize: '0.95rem' }}>{title}</span>
        <Icon />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginTop: '0.5rem' }}>
        <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a2e', lineHeight: '1' }}>
          {value}
        </span>
      </div>
      <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '0.25rem 0.75rem', backgroundColor: `${statusColor}1A`, color: statusColor, borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600' }}>
        {status}
      </div>
    </div>
  );

  return (
    <div style={{ width: '100%', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      <Card title="Sleep Quality" value={sleepScore} status="Good" statusColor="#10b981" Icon={MoonIcon} />
      <Card title="Focus Score" value={focusScore} status="Improving" statusColor="#8b5cf6" Icon={TargetIcon} />
      <Card title="Activity" value={activityScore} status="On Track" statusColor="#3b82f6" Icon={BoltIcon} />
    </div>
  );
}

export default Insights;
