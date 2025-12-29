import { Heart, X, Send, MessageSquarePlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import '../styles/main.css';

const Guestbook = ({ isOpen, onClose }) => {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ name: '', message: '' })
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/messages')
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error:', error)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!newMessage.message.trim()) {
      alert('Please add a message!')
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch ('http://localhost:3001/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage)
      });

      if (response.ok) {
        setNewMessage({ name: '', message: '' })
        fetchMessages();
      }
    } catch (error) {
      console.error('Error posting message:', error);
      alert('Failed to post message. Please try again!');
    } finally {
      setIsLoading(false);
    }
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
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        overflowY: 'auto',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '40px',
          right: '40px',
          padding: '12px',
          color: '#737373',
          background: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(225, 225, 225, 0.3)',
          borderRadius: '50%',
          cursor: 'pointer',
          transition: 'all 0.2s',
          zIndex: 10000,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#000';
          e.currentTarget.style.backgroundColor = '#fff';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#737373';
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <X size={24} />
      </button>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px 40px' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '16px',
            color: '#171717',
            letterSpacing: '-0.03em'
          }}>
            Guestbook
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#737373',
            fontWeight: '400'
          }}>
            Leave a message and share your thoughts!
          </p>
        </div>

        {/* Messages Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px',
          marginBottom: '24px'
        }}>
          {/* Add Message Card */}
          <div className="bento-card" style={{ minHeight: '280px' }}>
            <div className="label">
              <MessageSquarePlus size={14} style={{ display: 'inline', marginRight: '6px' }} />
              New Message
            </div>
            <form onSubmit={handleSubmit} style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column',
              gap: '16px',
              marginTop: '16px'
            }}>
              <input
                type="text"
                placeholder="Your name"
                value={newMessage.name}
                onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
                maxLength={50}
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid rgba(225, 225, 225, 0.3)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  fontSize: '15px',
                  fontFamily: 'Inter, sans-serif',
                  color: '#171717',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid #171717';
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(225, 225, 225, 0.3)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.5)';
                }}
              />
              <textarea
                placeholder="Your message..."
                value={newMessage.message}
                onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                maxLength={500}
                rows={4}
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid rgba(225, 225, 225, 0.3)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  fontSize: '15px',
                  fontFamily: 'Inter, sans-serif',
                  color: '#171717',
                  outline: 'none',
                  resize: 'none',
                  flex: 1,
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid #171717';
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(225, 225, 225, 0.3)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.5)';
                }}
              />
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  background: '#171717',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px 24px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: isLoading ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.background = '#404040';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#171717';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Send size={16} />
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Message Cards */}
          {messages.map((msg, index) => (
            <div 
              key={msg.id || index} 
              className="bento-card"
              style={{ 
                minHeight: '200px',
                animation: `fadeIn 0.5s ease-out ${index * 0.05}s backwards`
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#171717',
                    marginBottom: '4px'
                  }}>
                    {msg.name}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#a3a3a3'
                  }}>
                    {new Date(msg.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <Heart size={16} style={{ color: '#ef4444' }} />
              </div>
              <p style={{
                fontSize: '15px',
                color: '#525252',
                lineHeight: '1.6',
                wordWrap: 'break-word',
                flex: 1
              }}>
                {msg.message}
              </p>
            </div>
          ))}
        </div>

        {messages.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#a3a3a3',
            fontSize: '16px',
            fontStyle: 'italic'
          }}>
            No messages yet. Be the first to sign the guestbook!
          </div>
        )}
      </div>
    </div>
  )

}

export default Guestbook;