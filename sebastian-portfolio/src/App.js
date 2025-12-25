import React, { useState, useEffect, useCallback } from 'react';
import { Github, Linkedin, Instagram, Hash, CheckCircle2, Circle } from 'lucide-react';

export default function SebastianPortfolio() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [solvesToday] = useState(42);
  const [algProgress] = useState({ learned: 43, total: 57, type: 'OLLs' });
  const [todos, setTodos] = useState([
    { id: 1, text: 'Master all OLL algorithms', done: false },
    { id: 2, text: 'Build personal website', done: true },
    { id: 3, text: 'Add more goals here...', done: false }
  ]);

  // Click Speed Test State
  const [clicks, setClicks] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [bestCPS, setBestCPS] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    let timer;
    if (isTestActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0.01) {
            setIsTestActive(false);
            setTestComplete(true);
            const cps = clicks / 5;
            if (cps > bestCPS) setBestCPS(cps);
            return 0;
          }
          return prev - 0.01;
        });
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isTestActive, timeLeft, clicks, bestCPS]);

  const handleTestClick = (e) => {
    if (!isTestActive && !testComplete) {
      setIsTestActive(true);
    }
    if (isTestActive) {
      setClicks(prev => prev + 1);
      
      // Create ripple effect with correct positioning
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const newRipple = { x, y, id: Date.now() };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }
  };

  const resetTest = () => {
    setClicks(0);
    setIsTestActive(false);
    setTimeLeft(5);
    setTestComplete(false);
    setRipples([]);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-16 px-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .bento-container {
          max-width: 1200px;
          margin: 40px auto 0 auto;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
          grid-auto-rows: 175px;
        }

        .bento-card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          border: 1px solid #e5e5e5;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .bento-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border-color: #d4d4d4;
        }

        .bento-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .bento-card:hover::before {
          opacity: 1;
        }

        /* Grid spans */
        .span-2 { grid-column: span 2; }
        .span-3 { grid-column: span 3; }
        .span-4 { grid-column: span 4; }
        .row-2 { grid-row: span 2; }
        .row-3 { grid-row: span 3; }

        /* Typography */
        .label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #737373;
          margin-bottom: 16px;
        }

        .metric {
          font-size: 56px;
          font-weight: 700;
          line-height: 1;
          color: #171717;
          letter-spacing: -0.02em;
        }

        .metric-small {
          font-size: 28px;
          font-weight: 300;
          color: #a3a3a3;
        }

        /* Progress bar */
        .progress-track {
          height: 6px;
          background: #f5f5f5;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 10px;
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Social icons */
        .social-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .social-link {
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 14px;
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.2s;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }

        .social-link:hover {
          background: #f5f5f5;
          border-color: #d4d4d4;
          transform: scale(1.02);
        }

        .social-link svg {
          width: 18px;
          height: 18px;
          color: #525252;
          flex-shrink: 0;
        }

        .social-text {
          font-size: 13px;
          font-weight: 500;
          color: #171717;
        }

        .social-username {
          font-size: 11px;
          color: #737373;
          margin-top: 2px;
        }

        /* Status indicator */
        .status-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          display: inline-block;
          margin-right: 8px;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Todo list */
        .todo-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 10px;
          transition: background 0.2s;
          cursor: pointer;
        }

        .todo-item:hover {
          background: #fafafa;
        }

        .todo-text {
          font-size: 14px;
          color: #525252;
          flex: 1;
        }

        .todo-text.done {
          text-decoration: line-through;
          color: #a3a3a3;
        }

        .todo-icon {
          color: #d4d4d4;
          flex-shrink: 0;
        }

        .todo-icon.done {
          color: #22c55e;
        }

        /* Cubing stats grid */
        .cubing-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 16px;
        }

        .stat-card {
          background: #fafafa;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #f0f0f0;
        }

        .stat-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a3a3a3;
          margin-bottom: 10px;
        }

        .stat-value {
          font-size: 48px;
          font-weight: 700;
          color: #171717;
          letter-spacing: -0.02em;
        }

        /* Click Speed Test */
        .click-test-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          padding: 8px 0;
        }

        .test-stats {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          transition: all 0.3s ease;
          margin: 4px 0;
        }

        .test-stats.first-load {
          margin-top: 20px;
        }

        .test-stats.first-load .stat-box {
          padding: 12px;
        }

        .test-stats.first-load .stat-value {
          font-size: 24px;
        }

        .click-area {
          width: 100%;
          height: 180px;
          background: white;
          border: 3px solid #e5e5e5;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          transition: all 0.1s;
          position: relative;
          overflow: hidden;
        }

        .click-area:hover {
          border-color: #d4d4d4;
        }

        .click-area:active {
          transform: scale(0.98);
        }

        .click-area.active {
          border-color: #3b82f6;
          background: #fafafa;
        }

        .click-area.complete {
          border-color: #22c55e;
          background: #f0fdf4;
        }

        .click-ripple {
          position: absolute;
          width: 100px;
          height: 100px;
          margin-left: -50px;
          margin-top: -50px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0) 70%);
          pointer-events: none;
          transform: scale(0);
          animation: ripple-expand 0.6s ease-out;
        }

        @keyframes ripple-expand {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }

        .click-count {
          font-size: 64px;
          font-weight: 800;
          color: #171717;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .click-prompt {
          font-size: 12px;
          font-weight: 600;
          color: #737373;
          margin-top: 8px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .stat-box {
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 10px;
          padding: 8px;
          text-align: center;
        }

        .stat-label {
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #a3a3a3;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #171717;
          letter-spacing: -0.02em;
        }

        .test-button {
          background: #171717;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 20px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          width: 100%;
        }

        .test-button:hover {
          background: #404040;
        }

        .best-score {
          font-size: 10px;
          color: #737373;
          text-align: center;
          width: 100%;
          opacity: 0;
          animation: fadeInUp 0.4s ease forwards;
          animation-delay: 0.1s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ripple-expand {
          from {
            width: 0;
            height: 0;
            opacity: 1;
          }
          to {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }

        .click-count {
          font-size: 64px;
          font-weight: 800;
          color: #171717;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .click-prompt {
          font-size: 12px;
          font-weight: 600;
          color: #737373;
          margin-top: 8px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .stat-box {
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 10px;
          padding: 8px;
          text-align: center;
        }

        .stat-label {
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #a3a3a3;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #171717;
          letter-spacing: -0.02em;
        }

        .test-button {
          background: #171717;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 20px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          width: 100%;
        }

        .test-button:hover {
          background: #404040;
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bento-card {
          animation: fadeIn 0.5s ease-out backwards;
        }

        .bento-card:nth-child(1) { animation-delay: 0.05s; }
        .bento-card:nth-child(2) { animation-delay: 0.1s; }
        .bento-card:nth-child(3) { animation-delay: 0.15s; }
        .bento-card:nth-child(4) { animation-delay: 0.2s; }
        .bento-card:nth-child(5) { animation-delay: 0.25s; }
        .bento-card:nth-child(6) { animation-delay: 0.3s; }
        .bento-card:nth-child(7) { animation-delay: 0.35s; }
        .bento-card:nth-child(8) { animation-delay: 0.4s; }
      `}</style>

      <div className="bento-container">
        {/* Hero - Main intro */}
        <div className="bento-card span-4 row-2">
          <div>
            <div className="label">
              <span className="status-dot"></span>
              Available for opportunities
            </div>
            <h1 style={{ 
              fontSize: '56px', 
              fontWeight: '800', 
              lineHeight: '1.1', 
              marginBottom: '8px',
              color: '#171717',
              letterSpacing: '-0.03em'
            }}>
              Sebastian Wu
            </h1>
            <p style={{ 
              fontSize: '18px', 
              color: '#737373', 
              fontWeight: '400'
            }}>
              Grade 11 IB Student @ MHS, Ottawa
            </p>
          </div>
          
          <div className="social-grid">
            <a 
              href="https://github.com/b-snack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <Github />
              <div>
                <div className="social-text">GitHub</div>
                <div className="social-username">b-snack</div>
              </div>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/sebastian-wu-929172336/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <Linkedin />
              <div>
                <div className="social-text">LinkedIn</div>
                <div className="social-username">sebastian-wu</div>
              </div>
            </a>
            
            <a 
              href="https://www.instagram.com/b.snackkkkkkk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <Instagram />
              <div>
                <div className="social-text">Instagram</div>
                <div className="social-username">b.snackkkkkkk</div>
              </div>
            </a>
            
            <div 
              className="social-link"
              onClick={() => {
                navigator.clipboard.writeText('a.snack');
                alert('Discord username copied: a.snack');
              }}
            >
              <Hash />
              <div>
                <div className="social-text">Discord</div>
                <div className="social-username">a.snack</div>
              </div>
            </div>
          </div>
        </div>

        {/* Click Speed Test */}
        <div className="bento-card span-2 row-2" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div className="label" style={{ marginBottom: '12px' }}>Click Speed Test</div>
          
          <div className="click-test-container">
            <div 
              className={`click-area ${isTestActive ? 'active' : ''} ${testComplete ? 'complete' : ''}`}
              onClick={handleTestClick}
            >
              {ripples.map(ripple => (
                <div
                  key={ripple.id}
                  className="click-ripple"
                  style={{
                    left: `${ripple.x}%`,
                    top: `${ripple.y}%`,
                  }}
                />
              ))}
              <div className="click-count">{clicks}</div>
              <div className="click-prompt">
                {!isTestActive && !testComplete && 'Click to Start'}
                {isTestActive && 'Keep Clicking!'}
                {testComplete && 'Complete!'}
              </div>
            </div>

            <div className={`test-stats ${bestCPS === 0 && !testComplete ? 'first-load' : ''}`}>
              <div className="stat-box">
                <div className="stat-label">Time</div>
                <div className="stat-value">{timeLeft.toFixed(2)}s</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">CPS</div>
                <div className="stat-value">
                  {isTestActive || testComplete ? (clicks / (5 - timeLeft)).toFixed(1) : '0.0'}
                </div>
              </div>
            </div>

            {testComplete ? (
              <button className="test-button" onClick={resetTest}>
                Try Again
              </button>
            ) : bestCPS > 0 ? (
              <div className="best-score">
                Best: {bestCPS.toFixed(1)} CPS
              </div>
            ) : (
              <div style={{ height: '34px' }} />
            )}
          </div>
        </div>

        {/* Clock */}
        <div className="bento-card span-2">
          <div className="label">Current Time</div>
          <div className="metric" style={{ fontSize: '48px' }}>
            {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            })}
          </div>
          <p style={{ fontSize: '14px', color: '#a3a3a3', marginTop: '8px' }}>
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Interests */}
        <div className="bento-card span-2">
          <div className="label">Interests</div>
          <p style={{ 
            fontSize: '16px', 
            color: '#a3a3a3', 
            fontStyle: 'italic',
            margin: 'auto 0'
          }}>
            Add your interests here...
          </p>
        </div>

        {/* Skills */}
        <div className="bento-card span-2">
          <div className="label">Skills</div>
          <p style={{ 
            fontSize: '16px', 
            color: '#a3a3a3', 
            fontStyle: 'italic',
            margin: 'auto 0'
          }}>
            Add your skills here...
          </p>
        </div>

        {/* Todo List */}
        <div className="bento-card span-3 row-2">
          <div className="label">Goals & To-Do</div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            {todos.map(todo => (
              <div 
                key={todo.id} 
                className="todo-item"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.done ? (
                  <CheckCircle2 size={20} className="todo-icon done" />
                ) : (
                  <Circle size={20} className="todo-icon" />
                )}
                <span className={`todo-text ${todo.done ? 'done' : ''}`}>
                  {todo.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cubing - Combined Card */}
        <div className="bento-card span-3 row-2">
          <div className="label">Speedcubing</div>
          <div className="cubing-stats">
            <div className="stat-card">
              <div className="stat-label">Today's Solves</div>
              <div className="stat-value">{solvesToday}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Algs Learned</div>
              <div className="stat-value">{algProgress.learned}</div>
              <div style={{ fontSize: '11px', color: '#a3a3a3', marginTop: '4px' }}>
                / {algProgress.total} {algProgress.type}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Avg Solve</div>
              <div style={{ fontSize: '18px', color: '#a3a3a3', fontStyle: 'italic', marginTop: '8px' }}>
                Connect csTimer...
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Personal Best</div>
              <div style={{ fontSize: '18px', color: '#a3a3a3', fontStyle: 'italic', marginTop: '8px' }}>
                Add your PB...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}