import { X, Camera, Book, Pen, Film, Music, GraduationCap } from 'lucide-react';

const Navigation = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      {/* Close button - positioned above the icons */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          padding: '8px',
          color: '#737373',
          background: 'transparent',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#000';
          e.currentTarget.style.backgroundColor = '#f5f5f5';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#737373';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <X size={28} />
      </button>

      {/* Navigation Icons Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '48px',
        padding: '40px'
      }}>
        {/* Photography */}
        <div
          style={{
            cursor: 'pointer',
            padding: '24px',
            borderRadius: '16px',
            transition: 'all 0.3s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Camera size={48} style={{ color: '#171717' }} />
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#525252' }}>
            Photography
          </span>
        </div>

        {/* Reading */}
        <div
          style={{
            cursor: 'pointer',
            padding: '24px',
            borderRadius: '16px',
            transition: 'all 0.3s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Book size={48} style={{ color: '#171717' }} />
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#525252' }}>
            Reading
          </span>
        </div>

        {/* Writing */}
        <div
          style={{
            cursor: 'pointer',
            padding: '24px',
            borderRadius: '16px',
            transition: 'all 0.3s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Pen size={48} style={{ color: '#171717' }} />
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#525252' }}>
            Writing
          </span>
        </div>

        {/* Movies */}
        <div
          style={{
            cursor: 'pointer',
            padding: '24px',
            borderRadius: '16px',
            transition: 'all 0.3s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Film size={48} style={{ color: '#171717' }} />
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#525252' }}>
            Movies
          </span>
        </div>

        {/* Music */}
        <div
          style={{
            cursor: 'pointer',
            padding: '24px',
            borderRadius: '16px',
            transition: 'all 0.3s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Music size={48} style={{ color: '#171717' }} />
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#525252' }}>
            Music
          </span>
        </div>

        {/* Academics */}
        <div
          style={{
            cursor: 'pointer',
            padding: '24px',
            borderRadius: '16px',
            transition: 'all 0.3s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <GraduationCap size={48} style={{ color: '#171717' }} />
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#525252' }}>
            Academics
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;