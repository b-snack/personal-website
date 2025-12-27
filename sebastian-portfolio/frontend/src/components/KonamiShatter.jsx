import React, { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export default function KonamiShatter({ isShattered, setIsShattered }) {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [shards, setShards] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      
      if (key === KONAMI_CODE[konamiIndex]) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);
        
        if (newIndex === KONAMI_CODE.length) {
          triggerShatter();
          setKonamiIndex(0);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex]);

  const triggerShatter = () => {
    setIsShattered(true);
    
    // Create shards from all bento cards
    const cards = document.querySelectorAll('.bento-card');
    const newShards = [];
    
    cards.forEach((card, cardIndex) => {
      const rect = card.getBoundingClientRect();
      const shardsPerCard = 20; // Number of pieces per card
      
      for (let i = 0; i < shardsPerCard; i++) {
        newShards.push({
          id: `${cardIndex}-${i}`,
          x: rect.left + Math.random() * rect.width,
          y: rect.top + Math.random() * rect.height,
          width: 20 + Math.random() * 40,
          height: 20 + Math.random() * 40,
          rotation: Math.random() * 360,
          velocityX: (Math.random() - 0.5) * 10,
          velocityY: Math.random() * -5 - 5,
          rotationSpeed: (Math.random() - 0.5) * 20,
          color: getComputedStyle(card).backgroundColor || '#ffffff'
        });
      }
    });
    
    setShards(newShards);
    
    // Hide original cards
    cards.forEach(card => {
      card.style.opacity = '0';
    });
    
    // Rebuild after animation
    setTimeout(() => {
      setIsShattered(false);
      setShards([]);
      cards.forEach(card => {
        card.style.opacity = '1';
      });
    }, 3000);
  };

  return (
    <>
      {isShattered && (
        <div className="shatter-container">
          {shards.map((shard) => (
            <div
              key={shard.id}
              className="shard"
              style={{
                left: `${shard.x}px`,
                top: `${shard.y}px`,
                width: `${shard.width}px`,
                height: `${shard.height}px`,
                backgroundColor: shard.color,
                '--velocity-x': `${shard.velocityX}px`,
                '--velocity-y': `${shard.velocityY}px`,
                '--rotation': `${shard.rotation}deg`,
                '--rotation-speed': `${shard.rotationSpeed}deg`,
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .shatter-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }

        .shard {
          position: absolute;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          animation: shardFall 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          transform-origin: center;
        }

        @keyframes shardFall {
          0% {
            transform: translate(0, 0) rotate(var(--rotation));
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(var(--velocity-x) * 100),
              calc(100vh + var(--velocity-y) * 50)
            ) rotate(calc(var(--rotation) + var(--rotation-speed) * 20));
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}