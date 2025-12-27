import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export default function TimeTravelSlider() {
  const [snapshots, setSnapshots] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSnapshots();
    // Save current snapshot on mount
    saveCurrentSnapshot();
  }, []);

  const fetchSnapshots = async () => {
    try {
      const response = await axios.get(`${API_URL}/snapshots`);
      setSnapshots(response.data);
      setCurrentIndex(response.data.length - 1); // Start at most recent
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching snapshots:', error);
      setIsLoading(false);
    }
  };

  const saveCurrentSnapshot = async () => {
    try {
      const snapshot = {
        date: new Date().toISOString(),
        description: 'Auto-saved snapshot',
        // You can expand this to include more state
      };
      await axios.post(`${API_URL}/snapshots`, snapshot);
    } catch (error) {
      console.error('Error saving snapshot:', error);
    }
  };

  const handleSliderChange = (e) => {
    setCurrentIndex(parseInt(e.target.value));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="time-travel-container">
      <div className="label">Time Travel</div>
      
      {isLoading ? (
        <div className="loading">Loading timeline...</div>
      ) : snapshots.length === 0 ? (
        <div className="empty-state">
          <p>No snapshots yet</p>
          <small>The site will save snapshots over time</small>
        </div>
      ) : (
        <>
          <div className="timeline-display">
            <div className="current-date">
              {formatDate(snapshots[currentIndex]?.date)}
            </div>
            <div className="snapshot-count">
              Snapshot {currentIndex + 1} of {snapshots.length}
            </div>
          </div>

          <div className="slider-container">
            <input
              type="range"
              min="0"
              max={snapshots.length - 1}
              value={currentIndex}
              onChange={handleSliderChange}
              className="time-slider"
            />
            <div className="slider-labels">
              <span>Past</span>
              <span>Present</span>
            </div>
          </div>

          <div className="snapshot-description">
            {snapshots[currentIndex]?.description || 'No description'}
          </div>
        </>
      )}

      <style jsx>{`
        .time-travel-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 16px;
        }

        .loading,
        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #a3a3a3;
          font-size: 14px;
        }

        .empty-state small {
          font-size: 12px;
          color: #d4d4d4;
          margin-top: 4px;
        }

        .timeline-display {
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 16px;
          padding: 20px;
          text-align: center;
        }

        .current-date {
          font-size: 28px;
          font-weight: 700;
          color: #171717;
          letter-spacing: -0.02em;
        }

        .snapshot-count {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #a3a3a3;
          margin-top: 8px;
        }

        .slider-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .time-slider {
          width: 100%;
          height: 8px;
          border-radius: 10px;
          background: #f5f5f5;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
          cursor: pointer;
        }

        .time-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #171717;
          cursor: pointer;
          transition: all 0.2s;
        }

        .time-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #404040;
        }

        .time-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #171717;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }

        .time-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          background: #404040;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #a3a3a3;
          margin-top: 8px;
        }

        .snapshot-description {
          font-size: 13px;
          color: #737373;
          text-align: center;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}