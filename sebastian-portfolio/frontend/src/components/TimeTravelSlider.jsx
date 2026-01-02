import React from 'react';

export default function TimeTravelSlider({ snapshots, activeIndex, onSnapshotChange }) {
  const activeSnapshot = snapshots[activeIndex];
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      justifyContent: 'space-between'
    }}>
      <div className="label">Time Machine</div>
      
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        gap: '20px'
      }}>
        
        {/* Grid of version cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px'
        }}>
          {snapshots.map((snapshot, idx) => (
            <div
              key={idx}
              onClick={() => onSnapshotChange(idx)}
              style={{
                background: idx === activeIndex 
                  ? 'rgba(255, 255, 255, 0.6)' 
                  : 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(12px) saturate(200%)',
                WebkitBackdropFilter: 'blur(12px) saturate(200%)',
                border: idx === activeIndex 
                  ? '2px solid #171717' 
                  : '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                padding: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: idx === activeIndex 
                  ? '0 4px 12px rgba(0, 0, 0, 0.1)' 
                  : '0 2px 6px rgba(0, 0, 0, 0.05)'
              }}
              onMouseEnter={(e) => {
                if (idx !== activeIndex) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (idx !== activeIndex) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              <div style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#171717',
                marginBottom: '4px'
              }}>
                {snapshot.description}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#737373',
                fontWeight: '500'
              }}>
                {new Date(snapshot.date).toLocaleDateString('en-US', { 
                  month: 'short',
                  year: 'numeric'
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Current selection indicator */}
        {activeIndex < snapshots.length - 1 && (
          <div style={{
            textAlign: 'center',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid rgba(102, 126, 234, 0.15)'
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '600',
              color: 'black',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Viewing Past Version
            </div>
          </div>
        )}
      </div>
    </div>
  );
}