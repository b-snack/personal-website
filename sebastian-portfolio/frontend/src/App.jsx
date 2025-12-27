import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, Hash, Camera, ArrowDownToLine, Sun, CloudSun, CloudRain, CloudSnow, CloudLightning, Menu } from 'lucide-react';
import TimeTravelSlider from './components/TimeTravelSlider';
import KonamiShatter from './components/KonamiShatter';
import Photography from './components/Photography';
import Navigation from './components/Navigation';
import './styles/main.css';
import backgroundImage from "./components/background_img.jpg"

export default function SebastianPortfolio() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastfmTrack, setLastfmTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [weather, setWeather] = useState(null);
  const [isShattered, setIsShattered] = useState(false);
  const [isPhotographyOpen, setIsPhotographyOpen] = useState(false);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  // Fetch Last.fm data
  useEffect(() => {
    const fetchLastfm = async () => {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=bbbbsnack&api_key=6b3ea757852cb033acc6701bbe2987ab&format=json&limit=1`
        );
        const data = await response.json();
        
        if (data.recenttracks && data.recenttracks.track && data.recenttracks.track[0]) {
          const track = data.recenttracks.track[0];
          setLastfmTrack({
            name: track.name,
            artist: track.artist['#text'],
            album: track.album['#text'],
            image: track.image[3]['#text'],
          });
          setIsPlaying(track['@attr']?.nowplaying === 'true');
        }
      } catch (error) {
        console.error('Error fetching Last.fm data:', error);
      }
    };

    fetchLastfm();
    const interval = setInterval(fetchLastfm, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=45.4215&longitude=-75.6972&current=temperature_2m,weather_code&temperature_unit=celsius`
        );
        const data = await response.json();
        
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          code: data.current.weather_code
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code) => {
    const iconProps = { size: 64, strokeWidth: 1.5, color: '#171717' };
    if (code === 0) return <Sun {...iconProps} />;
    if (code <= 3) return <CloudSun {...iconProps} />;
    if (code <= 67) return <CloudRain {...iconProps} />;
    if (code <= 77) return <CloudSnow {...iconProps} />;
    if (code <= 99) return <CloudLightning {...iconProps} />;
    return <CloudSun {...iconProps} />;
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <KonamiShatter isShattered={isShattered} setIsShattered={setIsShattered} />
      <div style ={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1
      }}/>    
      <div className="min-h-screen py-16 px-8 relative" style={{ paddingBottom: '60px' }}>
        <div className="bento-wrapper">
          
          <div className="bento-container">
          {/* Hero - Main intro */}
          <div className="bento-card span-4 row-2" style={{ justifyContent: 'space-between' }}>
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
                marginTop: '5px',
                color: '#171717',
                letterSpacing: '-0.03em'
              }}>
                Sebastian Wu
              </h1>
              <p style={{ 
                marginTop: '20px',
                marginBottom: '10px',
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

            {/* Time Travel Slider - replaces tree */}
            <div className="bento-card span-2 row-2">
              <TimeTravelSlider />
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

            {/* Weather */}
            <div className="bento-card span-2">
              <div className="label">Weather in Ottawa</div>
              {weather ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  <div>
                    {getWeatherIcon(weather.code)}
                  </div>
                  <div>
                    <div className="metric" style={{ fontSize: '56px' }}>
                      {weather.temp}°C
                    </div>
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: '16px', color: '#a3a3a3', fontStyle: 'italic', margin: 'auto 0' }}>
                  Loading weather...
                </p>
              )}
            </div>

            {/* Last.fm Now Playing */}
            <div className="bento-card span-2">
              <div className="label">
                {isPlaying ? '🎵 Now Playing' : 'Last Played'}
              </div>
              {lastfmTrack ? (
                <div className="music-card-content">
                  {lastfmTrack.image && (
                    <img 
                      src={lastfmTrack.image} 
                      alt="Album art"
                      className="album-art"
                    />
                  )}
                  <div className="music-info">
                    <div className="track-name">{lastfmTrack.name}</div>
                    <div className="artist-name">{lastfmTrack.artist}</div>
                    {isPlaying && (
                      <div className="playing-indicator">
                        <div className="playing-dot"></div>
                        <div className="playing-text">Playing Now</div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p style={{ 
                  fontSize: '14px', 
                  color: '#a3a3a3', 
                  fontStyle: 'italic',
                  margin: 'auto 0'
                }}>
                  Loading music...
                </p>
              )}
            </div>

            {/* Languages & Skills */}
            <div className="bento-card span-2 row-3">
              <div className="label">Languages & Skills</div>
              <div style={{ flex: 1, overflow: 'auto', paddingTop: '20px' }}>
                <div className="skill-item">
                  <div className="skill-name">Python</div>
                  <div className="skill-level">Proficient</div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">HTML</div>
                  <div className="skill-level">Proficient</div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">CSS</div>
                  <div className="skill-level">Proficient</div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">JavaScript</div>
                  <div className="skill-level">Proficient</div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">React</div>
                  <div className="skill-level">Intermediate</div>
                </div>
              </div>
            </div>

            {/* About Me */}
            <div className="bento-card span-4 row-3">
              <div className="label">About Me</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '45px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#171717', marginBottom: '10px', marginTop: '10px' }}>
                    Who I Am
                  </h3>
                  <p style={{ fontSize: '16px', color: '#525252', lineHeight: '2' }}>
                    I'm a Grade 11 IB (International Baccalaureate 🤕) student at Merivale High School in Ottawa with a passion for technology and problem-solving. 
                    You'll usually find me cubing, writing, doing homework, watching youtube, or coding!
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#171717', marginTop: '-20px', marginBottom: '5px' }}>
                    Interests
                  </h3>
                  <p style={{ fontSize: '16px', color: '#525252', lineHeight: '2' }}>
                    Speedcubing, Problem Solving, Math, Studio Ghibli, Photography and Creative Writing
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#171717', marginTop: '-20px', marginBottom: '5px' }}>
                    Currently
                  </h3>
                  <p style={{ fontSize: '16px', color: '#525252', lineHeight: '2', marginTop: '5px' }}>
                    Building web applications with React (this website!), learning rubik's cube algorithms (COLL), exploring new things, (probably) listening to music.
                  </p>
                </div>
              </div>
            </div>

            {/* Resume Download */}
            <div 
              className="bento-card span-2"
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              onClick={() => alert('Add your resume PDF link here!')}
            >
              <div className="label">Resume</div>
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px'
              }}>
                <ArrowDownToLine size={48} style={{ color: '#171717' }} />
                <p style={{
                  fontSize: '14px',
                  color: '#525252',
                  fontWeight: '500'
                }}>
                  Download Resume
                </p>
              </div>
            </div>

            {/* Photography Card */}
            <div 
              className="bento-card span-2"
              onClick={() => setIsPhotographyOpen(true)}
              style={{ 
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className="label">Photography</div>
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Camera size={48} style={{ color: '#171717' }} />
                <p style={{ 
                  fontSize: '14px', 
                  color: '#525252',
                  textAlign: 'center',
                  fontWeight: '500'
                }}>
                  Click to View Gallery
                </p>
              </div>
            </div>


            {/* Photography Card */}
            <div 
              className="bento-card span-2"
              onClick={() => setIsNavigationOpen(true)}
              style={{ 
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className="label">Menu</div>
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Menu size={48} style={{ color: '#171717' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photography Modal */}
      <Photography 
        isOpen={isPhotographyOpen} 
        onClose={() => setIsPhotographyOpen(false)} 
      />

      {/* Navigation Modal */}
      <Navigation 
        isOpen={isNavigationOpen} 
        onClose={() => setIsNavigationOpen(false)} 
      />
    </>
  );
}