# System Patterns

## System Architecture

The portfolio website follows a **full-stack MERN architecture** with clear separation between frontend and backend:

```
┌─────────────────┐    HTTP/REST     ┌─────────────────┐
│   React Frontend│◄────────────────►│ Node.js/Express │
│   (Port 3000)   │                  │   (Port 3001)   │
└─────────────────┘                  └─────────────────┘
         │                                      │
         │                                      │
         ▼                                      ▼
┌─────────────────┐                  ┌─────────────────┐
│   User Browser  │                  │   MongoDB       │
│                 │                  │   Database      │
└─────────────────┘                  └─────────────────┘
```

### Key Architectural Decisions

1. **Monolithic Repository**: Frontend and backend in same repository for simplicity
2. **API-First Design**: Backend provides RESTful API, frontend consumes it
3. **Stateless Backend**: No server-side sessions, using JWT-like userId for guestbook likes
4. **External API Integration**: Third-party services for weather and music data

## Component Relationships

### Frontend Component Hierarchy

```
App.jsx (Root)
├── KonamiShatter (Easter egg)
├── TimeTravelSlider (Interactive timeline)
├── Photography (Modal gallery)
├── Navigation (Modal menu)
├── Guestbook (Modal with messages)
├── Cubing (Full-page component)
└── Bento Grid Cards
    ├── Hero Section
    ├── Clock Widget
    ├── Weather Widget
    ├── Music Widget
    ├── Skills Section
    ├── About Me
    ├── Resume Download
    ├── Photography Card
    └── Navigation Card
```

### Backend API Structure

```
/api
├── /messages (Guestbook)
│   ├── GET / - Get all messages
│   ├── POST / - Create new message
│   ├── POST /:id/like - Toggle like
│   └── GET /:id/like/:userId - Check like status
├── /snapshots (Time travel)
│   ├── GET / - Get all snapshots
│   ├── POST / - Create snapshot
│   └── DELETE /cleanup - Clean old snapshots
└── /health - Health check
```

## Critical Implementation Paths

### 1. Guestbook Message Flow

```
Frontend Form → POST /api/messages → MongoDB Save → Broadcast Update → Frontend Refresh
```

### 2. Like System Flow

```
Frontend Click → POST /api/messages/:id/like → Check User in likedBy Array →
Toggle Status → Update likeCount → Return New State → Frontend Update
```

### 3. Real-time Data Flow

```
Component Mount → API Call (Last.fm/Weather) → Set State →
Interval Refresh → Update State → Re-render Component
```

## Data Models

### MongoDB Schemas

```javascript
// Message Schema (Guestbook)
{
  name: String,        // User name (or "Anonymous")
  message: String,     // Message content (max 500 chars)
  timestamp: Date,     // Creation timestamp
  likedBy: [String],   // Array of user IDs who liked
  likeCount: Number    // Cached count for performance
}

// Snapshot Schema (Time Travel)
{
  date: Date,          // Snapshot date
  description: String, // Human-readable description
  data: Mixed          // Flexible data storage
}
```

### Frontend State Management

```javascript
// App.jsx State Structure
{
  currentTime: Date,           // Live clock
  lastfmTrack: Object|null,    // Music data
  isPlaying: Boolean,          // Music playing status
  weather: Object|null,        // Weather data
  isShattered: Boolean,        // Konami effect
  isPhotographyOpen: Boolean,  // Modal state
  isNavigationOpen: Boolean,   // Modal state
  currentPage: String,         // 'home' or 'cubing'
  isGuestbookOpen: Boolean     // Modal state
}
```

## Design Patterns in Use

### 1. Container/Presenter Pattern

- **App.jsx**: Container component managing state and logic
- **Child Components**: Presenter components receiving props

### 2. Modal Pattern

- Photography, Guestbook, Navigation use modal overlays
- Consistent open/close state management
- Escape key and backdrop click handlers

### 3. Widget Pattern

- Reusable card components for different data types
- Consistent styling with bento-grid layout
- Independent data fetching where appropriate

### 4. HOC-like Custom Hooks

- useEffect hooks for real-time data (weather, music, time)
- Interval management with cleanup
- Error handling within hooks

## Key Technical Decisions

### 1. State Management Choice

- **Why React Hooks over Redux**: Simplicity for moderate complexity
- **Local State**: Component-specific state stays in component
- **Lifted State**: Shared state lifted to App.jsx

### 2. Styling Approach

- **CSS over CSS-in-JS**: Better performance, easier debugging
- **BEM-like Naming**: `.bento-card`, `.social-link`, `.skill-item`
- **Inline Styles**: For dynamic values (colors, positions)

### 3. API Design

- **REST over GraphQL**: Simpler for current needs
- **Consistent Error Format**: `{ error: message }` for all endpoints
- **CORS Enabled**: Frontend-backend separation

### 4. Database Design

- **MongoDB over SQL**: Flexible schema for evolving features
- **Denormalized Counts**: `likeCount` cached for performance
- **Array Fields**: `likedBy` for simple relationship tracking

## Performance Considerations

### 1. Frontend Optimizations

- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Compressed photos in gallery
- **Memoization**: React.memo for expensive components

### 2. Backend Optimizations

- **Indexing**: MongoDB indexes on frequently queried fields
- **Pagination**: Limit results for large datasets
- **Caching**: Consider Redis for frequent queries

### 3. Network Optimizations

- **API Batching**: Combine related requests
- **Compression**: Gzip for API responses
- **CDN**: Static assets served via CDN

## Security Patterns

### 1. Input Validation

- Backend validation for all user inputs
- Max length limits for messages
- XSS prevention through sanitization

### 2. API Security

- CORS configured for specific origins
- Environment variables for secrets
- Rate limiting consideration

### 3. Data Protection

- No sensitive user data stored
- Anonymous guestbook posting allowed
- Like system uses anonymous userId

## Extension Points

### 1. Adding New Features

- New bento cards can be added to grid
- Additional API endpoints follow existing patterns
- New components integrate with existing state management

### 2. Scaling Considerations

- Database connection pooling
- Stateless horizontal scaling
- Load balancing for increased traffic

### 3. Monitoring & Analytics

- Health check endpoint
- Error logging integration
- Performance monitoring hooks
