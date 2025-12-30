import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Clock, TrendingUp, BarChart3, Zap, Target, Home } from 'lucide-react';


const Cubing = ({ onBack }) => {
  const [currentScramble, setCurrentScramble] = useState('');
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({
    personalBest: 0,
    ao5: 0,
    ao12: 0,
    ao100: 0,
    totalSolves: 0,
    recentSolves: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parse csTimer export file
  const parseCSTimerFile = (fileContent) => {
    try {
      const data = JSON.parse(fileContent);
      const solves = [];
      
      // Parse session1 (main 3x3 session)
      if (data.session1 && Array.isArray(data.session1)) {
        // Extract solve times
        // Format: [[penalty, time], "scramble", "comment", timestamp]
        data.session1.forEach(solve => {
          const penalty = solve[0][0]; // 0 = ok, 2000 = +2, -1 = DNF
          const time = solve[0][1]; // time in milliseconds
          const scramble = solve[1];
          const timestamp = solve[3];
          
          if (penalty !== -1) { // Filter out DNFs
            solves.push({
              time: time / 1000, // convert to seconds
              penalty: penalty,
              scramble: scramble,
              timestamp: timestamp
            });
          }
        });
      }
      
      return solves;
    } catch (error) {
      console.error('Error parsing csTimer file:', error);
      throw error;
    }
  };

  // Calculate statistics
  const calculateStats = (solves) => {
    if (!solves || solves.length === 0) {
      return {
        personalBest: 0,
        ao5: 0,
        ao12: 0,
        ao100: 0,
        totalSolves: 0,
        recentSolves: []
      };
    }

    // Personal Best
    const validTimes = solves.map(s => s.time);
    const pb = validTimes.length > 0 ? Math.min(...validTimes) : 0;

    // Calculate average of N (removing best and worst)
    const calculateAverage = (times, n) => {
      if (times.length < n) return 0;
      const recent = times.slice(-n);
      if (recent.length < n) return 0;
      
      const sorted = [...recent].sort((a, b) => a - b);
      const trimmed = sorted.slice(1, -1); // Remove best and worst
      const avg = trimmed.reduce((sum, t) => sum + t, 0) / trimmed.length;
      return avg;
    };

    const ao5 = calculateAverage(validTimes, 5);
    const ao12 = calculateAverage(validTimes, 12);
    const ao100 = calculateAverage(validTimes, 100);

    // Recent solves with running averages
    const recentSolves = solves.slice(-12).reverse().map((solve, index) => {
      const solveIndex = solves.length - 1 - index;
      const relevantSolves = validTimes.slice(0, solveIndex + 1);
      
      return {
        ...solve,
        ao5: calculateAverage(relevantSolves, 5),
        ao12: calculateAverage(relevantSolves, 12)
      };
    });

    return {
      personalBest: pb,
      ao5: ao5,
      ao12: ao12,
      ao100: ao100,
      totalSolves: solves.length,
      recentSolves: recentSolves
    };
  };

  // Load CSTimer data from file
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/assets/cubing/CSTimer.txt');
        
        if (!response.ok) {
          throw new Error('Could not load CSTimer data');
        }
        
        const content = await response.text();
        const solves = parseCSTimerFile(content);
        const calculatedStats = calculateStats(solves);
        
        setStats(calculatedStats);
        setLoading(false);
      } catch (err) {
        console.error('Error loading CSTimer data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []); // Empty dependency array - runs once on mount

  // Generate scramble
  const generateScramble = () => {
    const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
    const modifiers = ['', '\'', '2'];
    let scramble = [];
    let lastMove = '';
    let lastAxis = '';
    
    for (let i = 0; i < 20; i++) {
      let move;
      let axis;
      
      do {
        move = moves[Math.floor(Math.random() * moves.length)];
        axis = move === 'R' || move === 'L' ? 'RL' : 
               move === 'U' || move === 'D' ? 'UD' : 'FB';
      } while (move === lastMove || axis === lastAxis);
      
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      scramble.push(move + modifier);
      lastMove = move;
      lastAxis = axis;
    }
    
    return scramble.join(' ');
  };

  useEffect(() => {
    setCurrentScramble(generateScramble());
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    if (seconds === 0) return '0.00';
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(2);
    return mins > 0 ? `${mins}:${secs.padStart(5, '0')}` : secs;
  };

  const handleSpacePress = (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!isRunning) {
        setTimer(0);
        setIsRunning(true);
      } else {
        setIsRunning(false);
        setCurrentScramble(generateScramble());
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleSpacePress);
    return () => window.removeEventListener('keydown', handleSpacePress);
  }, [isRunning]);

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        // backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1
      }}/>
    {/* Back button
    <button
    onClick={onBack}
    style={{
        position: 'fixed',
        top: '40px',
        left: '40px',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(225, 225, 225, 0.3)',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        color: '#171717',
        transition: 'all 0.2s',
        zIndex: 100
    }}
    >
    <ArrowLeft size={18} />
    Back to Home
    </button> */}

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '25px', paddingBottom: '25px', paddingRight: '20px', paddingLeft: '20px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '40px',
          marginTop: '40px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            color: '#171717',
            margin: 0,
            letterSpacing: '-0.03em'
          }}>
            Speedcubing
          </h1>
          <Home 
            size={48} 
            style={{ color: '#171717', cursor: 'pointer', marginRight: '15px'}} 
            onClick={onBack}
          />
        {/* </div> */}
      </div>

        {loading ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            fontSize: '18px',
            color: '#737373'
          }}>
            Loading stats...
          </div>
        ) : error ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            gap: '16px'
          }}>
            <p style={{ fontSize: '18px', color: '#ef4444', fontWeight: '600' }}>
              Error loading data
            </p>
          </div>
        ) : (
          // Bento Grid with stats
          <div className="bento-container">

            {/* Personal Best - 3x3 */}
            <div className="bento-card span-2">
              <div className="label" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px'
              }}>
                <Trophy size={14} />
                3x3 PB Single
              </div>
              <div className="metric" style={{ paddingTop: '15px' }}>
                {formatTime(stats.personalBest)}
              </div>
            </div>

            {/* Average of 5 */}
            <div className="bento-card span-2">
              <div className="label" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingTop: '8px'
              }}>
                <BarChart3 size={14} />
                AVERAGE OF 5
              </div>
              <div className="metric" style={{ fontSize: '48px' }}>
                {formatTime(stats.ao5)}
              </div>
            </div>

            {/* Method Card */}
            <div className="bento-card span-2 row-2">
              <div className="label" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Target size={14} />
                METHOD & ALGS
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', paddingRight: '4px' }}>
                <div>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#171717',
                    marginBottom: '4px'
                  }}>
                    CFOP
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#737373'
                  }}>
                    Primary Method
                  </div>
                </div>
                <div className="skill-item">
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#171717',
                    marginBottom: '8px'
                  }}>
                    Currently Learning
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#3b82f6'
                  }}>
                    COLL
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#737373',
                    marginTop: '4px'
                  }}>
                    Advanced Last Layer
                  </div>
                </div>
                <div className='skill-item'>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#171717',
                    marginBottom: '8px'
                  }}>
                    Currently Learning
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#3b82f6'
                  }}>
                    F2L Optimization
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#737373',
                    marginTop: '4px'
                  }}>
                    Advanced First 2 Layers
                  </div>
                </div>
                </div>
              </div>

            {/* Average of 12 */}
            <div className="bento-card span-2">
              <div className="label" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingTop:'8px'
              }}>
                <TrendingUp size={14} />
                AVERAGE OF 12
              </div>
              <div className="metric" style={{ fontSize: '48px' }}>
                {formatTime(stats.ao12)}
              </div>
            </div>

            {/* Average of 100 */}
            <div className="bento-card span-2">
              <div className="label" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingTop:'8px'
              }}>
                <BarChart3 size={14} />
                AVERAGE OF 100
              </div>
              <div className="metric" style={{ fontSize: '48px' }}>
                {formatTime(stats.ao100)}
              </div>
            </div>

            {/* Recent Solves */}
            <div className="bento-card span-4 row-2">
              <div className="label" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Clock size={14} />
                RECENT SOLVES
              </div>
              <div style={{ flex: 1, overflowY: 'auto', paddingTop: '12px' }}>
                {stats.recentSolves.map((solve, index) => (
                  <div key={index} className="skill-item" style={{ marginBottom: '12px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#171717',
                        fontVariantNumeric: 'tabular-nums'
                      }}>
                        {formatTime(solve.time)}
                      </div>
                      <div style={{ display: 'flex', gap: '24px' }}>
                        <div>
                          <div style={{
                            fontSize: '10px',
                            color: '#a3a3a3',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            Ao5
                          </div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#525252',
                            fontVariantNumeric: 'tabular-nums'
                          }}>
                            {formatTime(solve.ao5)}
                          </div>
                        </div>
                        <div>
                          <div style={{
                            fontSize: '10px',
                            color: '#a3a3a3',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            Ao12
                          </div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#525252',
                            fontVariantNumeric: 'tabular-nums'
                          }}>
                            {formatTime(solve.ao12)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bento-card span-2">
              <div className="label" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Zap size={14} />
                TOTAL SOLVES
              </div>
              <div className="metric">
                {stats.totalSolves.toLocaleString()}
              </div>
            </div>

            {/* WCA Profile */}
            <div 
              className="bento-card span-2"
              onClick={() => window.open('https://www.worldcubeassociation.org/persons/2023WUSE01', '_blank')}
              style={{ cursor: 'pointer' }}
            >
              <div className="label" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Trophy size={14} />
                WCA PROFILE
              </div>
              <div style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#171717',
                marginTop: '16px'
              }}>
                Click to View →
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cubing;