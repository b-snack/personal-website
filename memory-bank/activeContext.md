# Active Context

## Current Work Focus

The portfolio website is in active development with core functionality implemented. Recent work has focused on enhancing the guestbook system with a like feature and improving overall user experience.

## Recent Changes

1. **Guestbook Like System** (Latest):

   - Implemented like/unlike functionality for guestbook messages
   - Added user-specific like tracking using userId
   - Created API endpoints for toggling likes and checking like status
   - Updated MongoDB schema with `likedBy` array and `likeCount` field

2. **Component Organization**:

   - Modular React components (TimeTravelSlider, Photography, Guestbook, Cubing, Navigation, KonamiShatter)
   - Centralized App.jsx managing state and routing between sections
   - Consistent styling with main.css

3. **External API Integrations**:
   - Last.fm API for real-time music tracking
   - Open-Meteo API for Ottawa weather data
   - Automatic refresh intervals for dynamic content

## Next Steps & Pending Tasks

1. **Immediate Priorities**:

   - Resume download functionality (currently placeholder alert)
   - Photography gallery improvements (more photos, better navigation)
   - Time travel slider data population with meaningful snapshots

2. **Technical Debt**:

   - Error handling improvements for API failures
   - Loading states for all async operations
   - Responsive design refinements for mobile devices

3. **Feature Enhancements**:
   - User authentication system for guestbook (optional)
   - Analytics integration for visitor tracking
   - Dark mode toggle
   - Performance optimizations (lazy loading, image compression)

## Active Decisions & Considerations

1. **Architecture Choice**: Full-stack MERN (MongoDB, Express, React, Node.js) for simplicity and consistency
2. **State Management**: Using React hooks (useState, useEffect) rather than Redux for manageable complexity
3. **Styling Approach**: CSS with custom classes rather than CSS-in-JS for maintainability
4. **Database Design**: Simple schemas for messages and snapshots with room for extension

## Important Patterns & Preferences

1. **Component Structure**:

   - Each major feature has its own component file
   - Props-based communication between components
   - Modal-based UI for secondary content (photography, guestbook, navigation)

2. **Code Style**:

   - Functional components with hooks
   - Descriptive variable names
   - Consistent indentation (2 spaces)
   - Inline styles for dynamic values, CSS classes for static styling

3. **API Design**:
   - RESTful endpoints with consistent error handling
   - Environment variables for sensitive data (API keys, MongoDB URI)
   - CORS enabled for frontend-backend communication

## Learnings & Project Insights

1. **Technical Learnings**:

   - MongoDB schema design for social features (like systems)
   - Real-time data fetching with intervals
   - React state management for complex UI interactions

2. **Project Management**:

   - Feature prioritization based on user value
   - Incremental development with working prototypes
   - Documentation importance for future maintenance

3. **User Experience**:
   - Interactive elements increase engagement
   - Real-time data creates dynamic experience
   - Consistent design language builds trust

## Current Challenges

1. **Guestbook Spam Prevention**: Need moderation system or CAPTCHA
2. **Performance Optimization**: Large image loading in photography gallery
3. **Content Management**: Manual updates required for new photos/projects
4. **Browser Compatibility**: Testing across different browsers and devices

## Development Workflow

1. **Local Development**:

   - Frontend: `cd sebastian-portfolio/frontend && npm start`
   - Backend: `cd sebastian-portfolio/backend && node server.js`
   - MongoDB: Local instance or cloud service

2. **Version Control**:

   - Git with GitHub integration
   - Feature branches for new development
   - Regular commits with descriptive messages

3. **Testing**:
   - Manual testing of interactive features
   - API testing with Postman/curl
   - Cross-browser testing

## Dependencies & Tools

- **Frontend**: React, lucide-react (icons), CSS
- **Backend**: Express, Mongoose, CORS, body-parser, dotenv
- **Development**: Node.js, npm, Git, VS Code
- **External Services**: MongoDB, Last.fm API, Open-Meteo API
