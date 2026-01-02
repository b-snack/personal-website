# Tech Context

## Technologies Used

### Frontend Stack

- **React 18**: UI library for component-based architecture
- **Create React App**: Build toolchain and development server
- **lucide-react**: Icon library for consistent SVG icons
- **CSS3**: Styling with custom classes and inline styles
- **JavaScript (ES6+)**: Modern JavaScript features

### Backend Stack

- **Node.js**: JavaScript runtime environment
- **Express**: Web application framework
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-origin resource sharing middleware
- **body-parser**: Request body parsing middleware
- **dotenv**: Environment variable management

### Database

- **MongoDB**: NoSQL document database
- **Mongoose ODM**: Schema-based solution for MongoDB

### External APIs

- **Last.fm API**: Music tracking and now playing data
- **Open-Meteo API**: Weather forecast data for Ottawa
- **Browser APIs**: Clipboard, Geolocation, etc.

### Development Tools

- **npm**: Package manager
- **Git**: Version control
- **VS Code**: Primary code editor
- **Chrome DevTools**: Debugging and performance analysis

## Development Setup

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

### Installation Steps

1. **Clone Repository**:

   ```bash
   git clone <repository-url>
   cd personalwebsite/sebastian-portfolio
   ```

2. **Frontend Setup**:

   ```bash
   cd frontend
   npm install
   ```

3. **Backend Setup**:

   ```bash
   cd backend
   npm install
   ```

4. **Environment Configuration**:
   - Create `.env` file in backend directory
   - Add `MONGODB_URI` and any API keys
   - Example:
     ```
     MONGODB_URI=mongodb://localhost:27017/portfolio
     PORT=3001
     ```

### Running the Application

1. **Start Backend Server**:

   ```bash
   cd backend
   node server.js
   # or with nodemon for development
   npx nodemon server.js
   ```

2. **Start Frontend Development Server**:

   ```bash
   cd frontend
   npm start
   ```

3. **Access Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Technical Constraints

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Limited IE11 support (not a priority)
- Mobile-responsive design required

### Performance Requirements

- Page load time under 3 seconds
- API response time under 500ms
- Smooth animations at 60fps

### Security Constraints

- No sensitive data exposure in frontend code
- Input validation on both client and server
- CORS configured for specific origins
- Environment variables for secrets

## Dependencies

### Frontend Package.json Highlights

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "react-scripts": "5.0.1"
  }
}
```

### Backend Package.json Highlights

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "cors": "^2.8.5",
    "body-parser": "^1.20.2",
    "dotenv": "^16.3.1"
  }
}
```

## Tool Usage Patterns

### Development Workflow

1. **Feature Development**:

   - Create feature branch from main
   - Implement changes with frequent commits
   - Test locally with both frontend and backend running
   - Create pull request for review

2. **Debugging**:

   - Chrome DevTools for frontend issues
   - Console logging for backend debugging
   - Postman/curl for API testing
   - MongoDB Compass for database inspection

3. **Testing**:
   - Manual testing of user flows
   - API endpoint testing
   - Cross-browser compatibility testing
   - Mobile responsiveness testing

### Code Quality Practices

1. **Linting**: ESLint configuration (if present)
2. **Formatting**: Prettier or editor formatting
3. **Commit Messages**: Conventional commits pattern
4. **Code Review**: Pull request reviews before merging

## Deployment Considerations

### Frontend Deployment

- Build command: `npm run build`
- Output: `build/` directory with static files
- Hosting options: Netlify, Vercel, GitHub Pages, AWS S3

### Backend Deployment

- Environment variables for production
- Process manager (PM2) for Node.js
- Hosting options: Heroku, AWS EC2, DigitalOcean, Railway

### Database Deployment

- MongoDB Atlas (cloud) or self-hosted
- Regular backups
- Monitoring and alerts

## Development Environment Details

### VS Code Extensions (Recommended)

- ESLint
- Prettier
- React Developer Tools
- MongoDB for VS Code
- GitLens

### Terminal Setup

- Zsh with Oh My Zsh
- Node version management (nvm)
- Git aliases for common commands

### Project Structure Conventions

```
sebastian-portfolio/
├── frontend/          # React application
│   ├── public/        # Static assets
│   └── src/           # Source code
│       ├── components/# React components
│       └── styles/    # CSS files
└── backend/           # Node.js/Express server
    ├── models/        # Mongoose models
    ├── routes/        # API routes
    └── server.js      # Entry point
```

## API Documentation

### Last.fm Integration

- **Endpoint**: `https://ws.audioscrobbler.com/2.0/`
- **Method**: `user.getrecenttracks`
- **Parameters**: `user=bbbbsnack`, `api_key`, `format=json`, `limit=1`
- **Refresh Interval**: 30 seconds

### Open-Meteo Integration

- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Parameters**: `latitude=45.4215`, `longitude=-75.6972`, `current=temperature_2m,weather_code`
- **Refresh Interval**: 10 minutes

### Custom Backend API

- **Base URL**: `http://localhost:3001/api`
- **Authentication**: None (public API)
- **Response Format**: JSON
- **Error Format**: `{ "error": "message" }`

## Performance Optimization Techniques

### Frontend Optimizations

- Code splitting with React.lazy()
- Image optimization and lazy loading
- Memoization with React.memo and useMemo
- Debounced API calls where appropriate

### Backend Optimizations

- MongoDB indexing on frequently queried fields
- Connection pooling for database
- Response compression
- Query optimization

## Monitoring and Maintenance

### Health Checks

- Backend: `GET /api/health`
- Frontend: Console error monitoring
- Database: Connection status checks

### Logging

- Console logging for development
- Structured logging for production
- Error tracking with Sentry (potential future)

### Analytics

- Basic visitor tracking (future)
- Feature usage metrics
- Performance monitoring
