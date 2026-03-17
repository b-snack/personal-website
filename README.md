# Sebastian Wu - Portfolio Website

A modern, interactive portfolio showcasing my projects, skills, and interests. Features a unique time-travel slider to explore different versions of the site over time.

Visit here: https://sebastian-portfolio-gold.vercel.app/

## 🌟 Features

- **Time Machine** - Slide through different versions of the portfolio to see how it evolved
- **Glassmorphism Design** - Modern liquid-glass aesthetic with smooth animations
- **Photography Gallery** - Curated collection of my photography work
- **Live Integrations**
  - Real-time music from Last.fm
  - Current weather in Ottawa
  - Live clock
- **Interactive Elements**
  - Konami code easter egg (try it!)
  - Cubing showcase page
  - Personal blog
  - Guestbook (coming soon)

## 🚀 Tech Stack

**Frontend:**
- React
- CSS3 (Glassmorphism)
- Lucide React Icons

**APIs:**
- Last.fm API (Now Playing)
- Open-Meteo API (Weather)

**Backend (Optional):**
- Node.js + Express
- MongoDB (for guestbook)

## 🎯 Live Demo

**[View Portfolio →](sebastian-portfolio-gold.vercel.app)**

## 📦 Installation
```
bash

# Clone the repository
git clone https://github.com/b-snack/personalwebsite.git

# Navigate to frontend
cd sebastian-portfolio/frontend

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:3000`

## 🎨 Project Structure
```
sebastian-portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── snapshots/       # Time Machine version data
│   │   ├── styles/          # CSS styling
│   │   └── SebastianPortfolio.jsx
│   └── package.json
└── backend/                 # Optional backend for guestbook
    └── server.js
```

## ⚡ Key Components

- **Time Machine** - Interactive version history slider
- **Bento Grid Layout** - Responsive card-based design
- **Photography Modal** - Fullscreen image gallery
- **Cubing Page** - Speedcubing achievements and PBs
- **Blog System** - Personal writing and updates

## 🛠️ Customization

### Adding a New Snapshot

1. Create `src/snapshots/vX-description.js`
2. Define snapshot data (hero, skills, features, etc.)
3. Import in `SebastianPortfolio.jsx`
4. Add to `SNAPSHOTS` array

### Changing Theme Colors

Edit `src/styles/main.css`:
- Card opacity: `.bento-card { background: rgba(...) }`
- Accent color: Update `#667eea` throughout
- Glass effect: Adjust `backdrop-filter` values

## 📱 Responsive Design

Fully responsive across:
- Desktop (1200px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🔮 Future Plans

- [ ] Deploy backend + MongoDB for guestbook
- [ ] Add more photography to gallery
- [ ] Expand blog with more posts
- [ ] Add project showcase section
- [ ] Integrate GitHub activity feed

## 👨‍💻 About Me

Grade 11 IB student at Merivale High School passionate about:
- 🧩 Speedcubing
- 📸 Photography
- 💻 Web Development
- ✍️ Creative Writing
- 🎬 Studio Ghibli

## 📫 Connect

- **GitHub**: [@b-snack](https://github.com/b-snack)
- **LinkedIn**: [sebastian-wu](https://www.linkedin.com/in/sebastian-wu-929172336/)
- **Instagram**: [@b.snackkkkkkk](https://www.instagram.com/b.snackkkkkkk/)
- **Discord**: a.snack

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Sebastian Wu
