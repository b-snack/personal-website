import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Masonry grid layout inspiration from:
// - Flowbite Tailwind CSS Gallery: https://flowbite.com/docs/components/gallery/
// - CSS Grid masonry techniques from various sources

const Photography = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Replace these placeholder URLs with your actual photo URLs
  const photos = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800',
    'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
    'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800',
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800',
    'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800',
  ];

  const openImage = (photo, index) => {
    setSelectedImage(photo);
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    const newIndex = (selectedIndex - 1 + photos.length) % photos.length;
    setSelectedIndex(newIndex);
    setSelectedImage(photos[newIndex]);
  };

  const goToNext = () => {
    const newIndex = (selectedIndex + 1) % photos.length;
    setSelectedIndex(newIndex);
    setSelectedImage(photos[newIndex]);
  };

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
        backgroundColor: '#fff',
        animation: 'fadeIn 0.4s ease-out'
      }}
    >
      {/* Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        borderBottom: '1px solid #e5e5e5',
        backgroundColor: '#fff'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#000',
          letterSpacing: '-0.01em'
        }}>
          Sebastian Wu
        </h2>
        <button
          onClick={onClose}
          style={{
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
          <X size={24} />
        </button>
      </div>

      {/* Gallery Grid - VSCO layout with 4 photos per row */}
      <div style={{
        height: '100%',
        overflowY: 'auto',
        paddingTop: '120px',
        paddingBottom: '40px',
        paddingLeft: '0',
        paddingRight: '0',
        backgroundColor: '#fff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px'
        }}>
          {/* 4 column masonry layout */}
          <div style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'flex-start'
          }}>
            {/* Create 4 columns */}
            {[0, 1, 2, 3].map((columnIndex) => (
              <div
                key={columnIndex}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}
              >
                {/* Distribute photos into columns */}
                {photos
                  .filter((_, index) => index % 4 === columnIndex)
                  .map((photo, photoIndex) => {
                    const originalIndex = photos.findIndex(p => p === photo);
                    return (
                      <div
                        key={originalIndex}
                        onClick={() => openImage(photo, originalIndex)}
                        style={{
                          cursor: 'pointer',
                          overflow: 'hidden',
                          backgroundColor: '#fafafa',
                          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
                          position: 'relative',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(0.98)';
                          e.currentTarget.style.opacity = '0.85';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.opacity = '1';
                        }}
                      >
                        <img
                          src={photo}
                          alt={`Photo ${originalIndex + 1}`}
                          style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                            display: 'block'
                          }}
                          loading="lazy"
                        />
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox for full-size image */}
      {selectedImage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10000,
          backgroundColor: 'rgba(0,0,0,0.97)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <button
            onClick={closeImage}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              padding: '8px',
              color: 'rgba(255,255,255,0.7)',
              background: 'transparent',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={28} />
          </button>

          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            style={{
              position: 'absolute',
              left: '32px',
              padding: '10px',
              color: 'rgba(255,255,255,0.7)',
              background: 'transparent',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={goToNext}
            style={{
              position: 'absolute',
              right: '32px',
              padding: '10px',
              color: 'rgba(255,255,255,0.7)',
              background: 'transparent',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <ChevronRight size={28} />
          </button>

          {/* Image with smooth zoom transition */}
          <img
            src={selectedImage}
            alt="Full size"
            style={{
              maxWidth: '85%',
              maxHeight: '85%',
              objectFit: 'contain',
              animation: 'zoomIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />

          {/* Image counter */}
          <div style={{
            position: 'absolute',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '13px',
            fontWeight: '400',
            letterSpacing: '0.05em'
          }}>
            {selectedIndex + 1} / {photos.length}
          </div>
        </div>
      )}

      <style>{`
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Photography;