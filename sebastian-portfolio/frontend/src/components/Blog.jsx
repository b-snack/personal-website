import React, { useState } from 'react';
import { X, Calendar, Clock, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = ({ onBack }) => {

  const blogPosts = [
    {
      //size is just set to large cuz im too lazy to remove it - shoudl be all the same size
      id: 1,
      title: "template",
      date: "Jan 1, 1375",
      readTime: "5 minute read",
      image: "/assets/blogphotos/blog1.png",
      content: "all content. paragraphs will automatically format (hopefully)",
      excerpt: " brief description",
      size: "large",
      rowSpan: 'row-3'
    },
    {
      id: 2,
      title: "template",
      date: "Jan 1, 1375",
      readTime: "5 minute read",
      image: "/assets/blogphotos/blog2.png",
      content: "all content. paragraphs will automatically format (hopefully)",
      excerpt: " brief description",
      size: "large",
      rowSpan: 'row-3'
    },
    {
      id: 3,
      title: "template",
      date: "Jan 1, 1375",
      readTime: "5 minute read",
      image: "/assets/blogphotos/blog2.png",
      content: "all content. paragraphs will automatically format (hopefully)",
      excerpt: " brief description",
      size: "large",
      rowSpan: 'row-2'
    }
  ]

  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>

      {!selectedPost ? (
        <div className="bento-wrapper" style={{ paddingTop: '40px' }}>

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
                  Blog
                </h1>
                <Home 
                  size={48} 
                  style={{ color: '#171717', cursor: 'pointer', marginRight: '15px'}} 
                  onClick={onBack}
                />
              </div>
            </div>

          {/* Blog posts with custom sizes */}
          <div className="bento-container">
            {blogPosts.map((post) => {
              const spanClass = post.size === 'large' ? 'span-3': 'span-2';
              const imageHeight = post.size === 'large' ? '300px' : '200px';
              const titleSize = post.size === 'large' ? '24px' : '18px';
              const rowClass = post.rowSpan || '';

              return (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`bento-card ${spanClass} ${rowClass}`}
                  style={{ cursor: 'pointer' }}
                >
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: imageHeight,
                        objectFit: 'cover',
                        borderRadius: '12px',
                        marginBottom: '16px'
                      }}
                    />
                  )}
                  
                  <div className="label">{post.date}</div>
                  
                  <h2 style={{
                    fontSize: titleSize,
                    fontWeight: '700',
                    color: '#171717',
                    marginBottom: '12px',
                    lineHeight: '1.3'
                  }}>
                    {post.title}
                  </h2>
                  
                  {post.size === 'large' && (
                    <p style={{
                      fontSize: '15px',
                      color: '#525252',
                      lineHeight: '1.6',
                      marginBottom: '16px'
                    }}>
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div style={{
                    fontSize: '12px',
                    color: '#737373',
                    marginTop: 'auto'
                  }}>
                    {post.readTime}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '120px 40px 40px 40px'
        }}>
          <button
            onClick={() => setSelectedPost(null)}
            className="blog-back-button"
          >
            ← Back to all posts
          </button>

          <h1 className="metric" style={{ marginBottom: '16px' }}>
            {selectedPost.title}
          </h1>

          <div style={{
            display: 'flex',
            gap: '16px',
            fontSize: '14px',
            color: '#737373',
            marginBottom: '40px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} />
              {selectedPost.date}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} />
              {selectedPost.readTime}
            </div>
          </div>

          {selectedPost.image && (
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title}
              style={{
                width: '100%',
                borderRadius: '16px',
                marginBottom: '40px'
              }}
            />
          )}

          <div style={{
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#171717',
            whiteSpace: 'pre-wrap'
          }}>
            {selectedPost.content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
