import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logVitals } from '../api/client';

const CustomSlider = ({ label, value, min, max, onChange, unit = '' }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: '500' }}>{label}</span>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontWeight: '500' }}>{value}{unit}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="custom-slider"
        style={{
          width: '100%',
          appearance: 'none',
          height: '6px',
          background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${percentage}%, rgba(255,255,255,0.1) ${percentage}%, rgba(255,255,255,0.1) 100%)`,
          borderRadius: '3px',
          outline: 'none'
        }}
      />
    </div>
  );
};

const Card = ({ title, emoji, children }) => (
  <div style={{
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column'
  }}>
    <h3 style={{ margin: '0 0 1.5rem 0', color: '#ffffff', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
      <span>{emoji}</span> {title}
    </h3>
    {children}
  </div>
);

function DailyInput() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Daily Input');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [vitals, setVitals] = useState({
    sleep: { duration: 7, quality: 6, consistency: 6 },
    work: { focusHours: 4, stress: 5, tasks: 5 },
    money: { spend: 5, anxiety: 4, saving: 3 },
    health: { exercise: 20, energy: 5, nutrition: 5 },
    relationships: { social: 3, connection: 5, conflict: 3 },
    mental: { clarity: 5, overwhelm: 5, motivation: 5 },
    mood: { overall: 5, anxiety: 4, happiness: 5 },
    environment: { workspace: 5, distraction: 5, comfort: 5 }
  });

  const updateVital = (category, field, value) => {
    setVitals(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await logVitals(vitals);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error submitting vitals:', err);
      if (err?.response?.status === 404) {
        navigate('/dashboard');
      } else {
        setError('Failed to submit vitals. Please try again.');
        setSubmitting(false);
      }
    }
  };

  const renderDailyInput = () => (
    <>
      <h2 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', fontWeight: '700', marginBottom: '2rem' }}>
        LOG TODAY'S VITALS — DAY 8
      </h2>

      {error && (
        <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.5)', color: '#fca5a5', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
          {error}
        </div>
      )}

      <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '3rem' }}>
        <Card title="Sleep" emoji="🌙">
          <CustomSlider label="Duration" min={0} max={12} value={vitals.sleep.duration} unit="h" onChange={(val) => updateVital('sleep', 'duration', val)} />
          <CustomSlider label="Quality" min={0} max={10} value={vitals.sleep.quality} onChange={(val) => updateVital('sleep', 'quality', val)} />
          <CustomSlider label="Bedtime consistency" min={0} max={10} value={vitals.sleep.consistency} onChange={(val) => updateVital('sleep', 'consistency', val)} />
        </Card>
        <Card title="Work" emoji="💼">
          <CustomSlider label="Focus hours" min={0} max={12} value={vitals.work.focusHours} unit="h" onChange={(val) => updateVital('work', 'focusHours', val)} />
          <CustomSlider label="Stress level" min={0} max={10} value={vitals.work.stress} onChange={(val) => updateVital('work', 'stress', val)} />
          <CustomSlider label="Tasks completed" min={0} max={10} value={vitals.work.tasks} onChange={(val) => updateVital('work', 'tasks', val)} />
        </Card>
        <Card title="Money" emoji="₹">
          <CustomSlider label="Spend vs plan" min={0} max={10} value={vitals.money.spend} onChange={(val) => updateVital('money', 'spend', val)} />
          <CustomSlider label="Financial anxiety" min={0} max={10} value={vitals.money.anxiety} onChange={(val) => updateVital('money', 'anxiety', val)} />
          <CustomSlider label="Saving streak" min={0} max={10} value={vitals.money.saving} onChange={(val) => updateVital('money', 'saving', val)} />
        </Card>
        <Card title="Health" emoji="❤️">
          <CustomSlider label="Exercise" min={0} max={120} value={vitals.health.exercise} unit="min" onChange={(val) => updateVital('health', 'exercise', val)} />
          <CustomSlider label="Energy level" min={0} max={10} value={vitals.health.energy} onChange={(val) => updateVital('health', 'energy', val)} />
          <CustomSlider label="Nutrition score" min={0} max={10} value={vitals.health.nutrition} onChange={(val) => updateVital('health', 'nutrition', val)} />
        </Card>
        <Card title="Relationships" emoji="🤝">
          <CustomSlider label="Social time" min={0} max={10} value={vitals.relationships.social} onChange={(val) => updateVital('relationships', 'social', val)} />
          <CustomSlider label="Connection quality" min={0} max={10} value={vitals.relationships.connection} onChange={(val) => updateVital('relationships', 'connection', val)} />
          <CustomSlider label="Conflict level" min={0} max={10} value={vitals.relationships.conflict} onChange={(val) => updateVital('relationships', 'conflict', val)} />
        </Card>
        <Card title="Focus / Mental" emoji="🧠">
          <CustomSlider label="Clarity" min={0} max={10} value={vitals.mental.clarity} onChange={(val) => updateVital('mental', 'clarity', val)} />
          <CustomSlider label="Overwhelm" min={0} max={10} value={vitals.mental.overwhelm} onChange={(val) => updateVital('mental', 'overwhelm', val)} />
          <CustomSlider label="Motivation" min={0} max={10} value={vitals.mental.motivation} onChange={(val) => updateVital('mental', 'motivation', val)} />
        </Card>
        <Card title="Mood" emoji="⭐">
          <CustomSlider label="Overall mood" min={0} max={10} value={vitals.mood.overall} onChange={(val) => updateVital('mood', 'overall', val)} />
          <CustomSlider label="Anxiety level" min={0} max={10} value={vitals.mood.anxiety} onChange={(val) => updateVital('mood', 'anxiety', val)} />
          <CustomSlider label="Happiness" min={0} max={10} value={vitals.mood.happiness} onChange={(val) => updateVital('mood', 'happiness', val)} />
        </Card>
        <Card title="Environment" emoji="🏠">
          <CustomSlider label="Workspace quality" min={0} max={10} value={vitals.environment.workspace} onChange={(val) => updateVital('environment', 'workspace', val)} />
          <CustomSlider label="Distraction level" min={0} max={10} value={vitals.environment.distraction} onChange={(val) => updateVital('environment', 'distraction', val)} />
          <CustomSlider label="Comfort" min={0} max={10} value={vitals.environment.comfort} onChange={(val) => updateVital('environment', 'comfort', val)} />
        </Card>
      </div>

      <button 
        onClick={handleSubmit} disabled={submitting}
        style={{
          width: '100%', padding: '16px', borderRadius: '12px', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
          color: 'white', border: 'none', fontSize: '1.1rem', fontWeight: '700', cursor: submitting ? 'not-allowed' : 'pointer',
          opacity: submitting ? 0.7 : 1, boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)', transition: 'transform 0.1s',
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
        }}
        onMouseDown={(e) => !submitting && (e.target.style.transform = 'scale(0.99)')}
        onMouseUp={(e) => !submitting && (e.target.style.transform = 'scale(1)')}
      >
        {submitting ? 'Calculating...' : 'Calculate My Cascade Score →'}
      </button>
    </>
  );

  const renderBottlenecks = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', fontWeight: '700', marginBottom: '1rem' }}>ACTIVE BOTTLENECKS</h2>
      
      <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '14px', borderLeft: '4px solid #ef4444', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>Sleep Deficit</h3>
          <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '600' }}>Critical</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', margin: '0 0 1.5rem 0', fontSize: '0.95rem' }}>Your sleep average is 5.2h — 30% below optimal</p>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
            <span>Impact on Overall Score</span>
            <span>-15%</span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
            <div style={{ width: '85%', height: '100%', backgroundColor: '#ef4444', borderRadius: '3px' }}></div>
          </div>
        </div>
        <button style={{ backgroundColor: '#8b5cf6', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Fix This</button>
      </div>

      <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '14px', borderLeft: '4px solid #f97316', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ margin: '0', fontSize: '1.1rem', fontWeight: '700' }}>Low Physical Activity</h3>
          <span style={{ backgroundColor: 'rgba(249, 115, 22, 0.15)', color: '#fb923c', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '600' }}>High</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', margin: '0 0 1.5rem 0', fontSize: '0.95rem' }}>Only 2 active days this week</p>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
            <span>Impact on Overall Score</span>
            <span>-8%</span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
            <div style={{ width: '55%', height: '100%', backgroundColor: '#f97316', borderRadius: '3px' }}></div>
          </div>
        </div>
        <button style={{ backgroundColor: '#8b5cf6', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Fix This</button>
      </div>

      <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '14px', borderLeft: '4px solid #eab308', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ margin: '0', fontSize: '1.1rem', fontWeight: '700' }}>Financial Stress</h3>
          <span style={{ backgroundColor: 'rgba(234, 179, 8, 0.15)', color: '#facc15', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '600' }}>Medium</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', margin: '0 0 1.5rem 0', fontSize: '0.95rem' }}>Spending 20% over budget</p>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
            <span>Impact on Overall Score</span>
            <span>-5%</span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
            <div style={{ width: '35%', height: '100%', backgroundColor: '#eab308', borderRadius: '3px' }}></div>
          </div>
        </div>
        <button style={{ backgroundColor: '#8b5cf6', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Fix This</button>
      </div>
    </div>
  );

  const renderLifeMap = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', fontWeight: '700' }}>CAUSE-EFFECT RELATIONSHIPS</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', padding: '0.75rem 1.5rem', borderRadius: '999px', fontWeight: '600' }}>Poor Sleep</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>→</span>
        <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', padding: '0.75rem 1.5rem', borderRadius: '999px', fontWeight: '600' }}>Low Energy</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>→</span>
        <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', padding: '0.75rem 1.5rem', borderRadius: '999px', fontWeight: '600' }}>Poor Focus</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>→</span>
        <span style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#d8b4fe', padding: '0.75rem 1.5rem', borderRadius: '999px', fontWeight: '600' }}>Low Score</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', padding: '0.75rem 1.5rem', borderRadius: '999px', fontWeight: '600' }}>High Stress</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>→</span>
        <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', padding: '0.75rem 1.5rem', borderRadius: '999px', fontWeight: '600' }}>Bad Mood</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>→</span>
        <span style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#d8b4fe', padding: '0.75rem 1.5rem', borderRadius: '999px', fontWeight: '600' }}>Low Productivity</span>
      </div>
    </div>
  );

  const renderPipeline = () => {
    const items = [
      { time: '08:00 AM', text: 'Morning routine (20 min)', cat: 'Habit', status: 'done' },
      { time: '09:00 AM', text: 'Deep work block (2 hrs)', cat: 'Focus', status: 'done' },
      { time: '11:00 AM', text: 'Short walk (15 min)', cat: 'Health', status: 'done' },
      { time: '01:00 PM', text: 'Healthy lunch break', cat: 'Nutrition', status: 'active' },
      { time: '03:00 PM', text: 'Review tasks (15 min)', cat: 'Work', status: 'upcoming' },
      { time: '06:00 PM', text: 'Exercise session (30 min)', cat: 'Activity', status: 'upcoming' },
      { time: '10:00 PM', text: 'Wind down routine', cat: 'Sleep', status: 'upcoming' }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', fontWeight: '700' }}>TODAY'S ACTION PIPELINE</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '88px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'rgba(255,255,255,0.05)' }}></div>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 1 }}>
              <div style={{ width: '70px', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontWeight: '600', textAlign: 'right' }}>{item.time}</div>
              <div style={{ 
                width: '12px', height: '12px', borderRadius: '50%', 
                backgroundColor: item.status === 'done' ? '#10b981' : item.status === 'active' ? '#8b5cf6' : 'rgba(255,255,255,0.2)',
                boxShadow: item.status === 'active' ? '0 0 0 4px rgba(139, 92, 246, 0.3)' : 'none',
                animation: item.status === 'active' ? 'pulse 2s infinite' : 'none'
              }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                <span style={{ 
                  color: item.status === 'done' ? 'rgba(255,255,255,0.4)' : 'white', 
                  textDecoration: item.status === 'done' ? 'line-through' : 'none',
                  fontSize: '1.05rem', fontWeight: '500' 
                }}>
                  {item.text}
                </span>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>
                  {item.cat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTomorrow = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', fontWeight: '700' }}>TOMORROW'S FOCUS</h2>
      
      <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05))', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '3rem' }}>🌤️</span>
        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>Predicted Score: 74</h3>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)' }}>Conditions are optimal for deep work tomorrow morning.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'white', margin: '1rem 0 0 0' }}>Priority Tasks</h3>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }}></div>
          <span style={{ fontWeight: '500' }}>Finish Q3 presentation outline</span>
        </div>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }}></div>
          <span style={{ fontWeight: '500' }}>Go to the gym (Leg day)</span>
        </div>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }}></div>
          <span style={{ fontWeight: '500' }}>Call parents</span>
        </div>
      </div>

      <button style={{ backgroundColor: '#8b5cf6', color: 'white', border: 'none', padding: '1rem', borderRadius: '12px', fontWeight: '700', fontSize: '1.05rem', cursor: 'pointer', marginTop: '1rem' }}>Optimize Tomorrow</button>
      
      <div style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '1.25rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🌙</span>
        <div>
          <h4 style={{ margin: 0, color: '#34d399', fontSize: '1rem', fontWeight: '600' }}>Sleep Goal: 8 hours</h4>
          <p style={{ margin: '0.25rem 0 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Be in bed by 10:30 PM tonight to hit this.</p>
        </div>
      </div>
    </div>
  );

  const renderMLStatus = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', fontWeight: '700' }}>CASCADE INTELLIGENCE ENGINE</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', padding: '1.25rem 1.5rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#10b981', fontSize: '0.8rem' }}>●</span>
            <span style={{ fontWeight: '600', color: '#10b981' }}>ACTIVE</span>
            <span style={{ color: 'white', fontWeight: '600' }}>Pattern Recognition</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Analyzing 847 data points</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', padding: '1.25rem 1.5rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#10b981', fontSize: '0.8rem' }}>●</span>
            <span style={{ fontWeight: '600', color: '#10b981' }}>ACTIVE</span>
            <span style={{ color: 'white', fontWeight: '600' }}>Bottleneck Detector</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>3 patterns identified</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', padding: '1.25rem 1.5rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#3b82f6', fontSize: '0.8rem' }}>●</span>
            <span style={{ fontWeight: '600', color: '#3b82f6' }}>LEARNING</span>
            <span style={{ color: 'white', fontWeight: '600' }}>Behavior Predictor</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Day 8 of 30 training</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', padding: '1.25rem 1.5rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>●</span>
            <span style={{ fontWeight: '600', color: 'rgba(255,255,255,0.5)' }}>PENDING</span>
            <span style={{ color: 'white', fontWeight: '600' }}>Life Graph Builder</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Needs 14 more days</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', padding: '1.25rem 1.5rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>●</span>
            <span style={{ fontWeight: '600', color: 'rgba(255,255,255,0.5)' }}>PENDING</span>
            <span style={{ color: 'white', fontWeight: '600' }}>Auto-Optimizer</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Unlocks at Day 15</span>
        </div>
      </div>

      <div style={{ marginTop: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
          <span style={{ fontWeight: '600' }}>Model Accuracy: 67%</span>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '1.5rem' }}>
          <div style={{ width: '67%', height: '100%', backgroundColor: '#8b5cf6', borderRadius: '4px' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
          <span style={{ fontWeight: '600' }}>Training Progress: 8/30 days</span>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '1.5rem' }}>
          <div style={{ width: '26%', height: '100%', backgroundColor: '#8b5cf6', borderRadius: '4px' }}></div>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>Your AI gets smarter every day you log</p>
      </div>
    </div>
  );

  const renderDataStore = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '800px', margin: '0 auto' }}>
      <div>
        <h2 style={{ fontSize: '0.85rem', color: '#c084fc', letterSpacing: '0.15em', fontWeight: '700', marginBottom: '1rem' }}>SLEEP DATA</h2>
        <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Last 7 days average</span>
            <span style={{ fontWeight: '600' }}>6.2h</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', backgroundColor: 'transparent' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Best night</span>
            <span style={{ fontWeight: '600' }}>8.1h (Tuesday)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Worst night</span>
            <span style={{ fontWeight: '600' }}>4.5h (Friday)</span>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '0.85rem', color: '#c084fc', letterSpacing: '0.15em', fontWeight: '700', marginBottom: '1rem' }}>ACTIVITY DATA</h2>
        <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Weekly steps</span>
            <span style={{ fontWeight: '600' }}>34,200</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', backgroundColor: 'transparent' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Active days</span>
            <span style={{ fontWeight: '600' }}>3/7</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Avg exercise</span>
            <span style={{ fontWeight: '600' }}>18 min/day</span>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '0.85rem', color: '#c084fc', letterSpacing: '0.15em', fontWeight: '700', marginBottom: '1rem' }}>MENTAL DATA</h2>
        <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Avg mood</span>
            <span style={{ fontWeight: '600' }}>6.4/10</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', backgroundColor: 'transparent' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Stress trend</span>
            <span style={{ fontWeight: '600', color: '#10b981' }}>Decreasing ↓</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Focus sessions</span>
            <span style={{ fontWeight: '600' }}>12</span>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '0.85rem', color: '#c084fc', letterSpacing: '0.15em', fontWeight: '700', marginBottom: '1rem' }}>FINANCIAL DATA</h2>
        <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Weekly spend</span>
            <span style={{ fontWeight: '600' }}>₹4,200</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', backgroundColor: 'transparent' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Budget usage</span>
            <span style={{ fontWeight: '600' }}>87%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Saving streak</span>
            <span style={{ fontWeight: '600' }}>3 days</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'Daily Input': return renderDailyInput();
      case 'Bottlenecks': return renderBottlenecks();
      case 'Life Map': return renderLifeMap();
      case 'Pipeline': return renderPipeline();
      case 'Tomorrow': return renderTomorrow();
      case 'ML Status': return renderMLStatus();
      case 'Data Store': return renderDataStore();
      default: return renderDailyInput();
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0f1a', color: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style>
        {`
          .custom-slider::-webkit-slider-thumb {
            appearance: none; width: 18px; height: 18px; border-radius: 50%;
            background: #ffffff; cursor: pointer; box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
            transition: transform 0.1s;
          }
          .custom-slider::-webkit-slider-thumb:hover { transform: scale(1.1); }
          @media (min-width: 768px) { .cards-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(139, 92, 246, 0); }
            100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
          }
        `}
      </style>

      {/* Top Header */}
      <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>Cascade</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em' }}>LEVERAGE · AI TRACK</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600' }}>
              Day 8 / 15
            </span>
            <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '10px' }}>●</span> Pipeline active
            </span>
          </div>
        </div>

        {/* Nav Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
          {['Daily Input', 'Bottlenecks', 'Life Map', 'Pipeline', 'Tomorrow', 'ML Status', 'Data Store'].map((tab, idx) => (
            <div key={idx} onClick={() => setActiveTab(tab)} style={{
              padding: '0.5rem 1.25rem', borderRadius: '999px',
              backgroundColor: activeTab === tab ? '#ffffff' : 'transparent',
              color: activeTab === tab ? '#0d0f1a' : 'rgba(255,255,255,0.5)',
              fontWeight: '600', fontSize: '0.9rem', whiteSpace: 'nowrap', cursor: 'pointer',
              transition: 'background-color 0.2s, color 0.2s'
            }}>
              {tab}
            </div>
          ))}
        </div>
      </header>

      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default DailyInput;
