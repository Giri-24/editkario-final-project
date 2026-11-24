# 🎬 Editkaro.in — Production Video Editing & Creative Agency Platform

[![Deploy Status](https://img.shields.io/badge/Deploy-Live%20on%20Netlify-00C7B7?logo=netlify&logoColor=white)](https://editkaro-final-project.netlify.app)
[![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel%20Ready-000000?logo=vercel&logoColor=white)](https://editkario-final-project.vercel.app)
[![Architecture](https://img.shields.io/badge/Architecture-Production--Ready%20Clean%20Stack-6366F1)](https://github.com/Giri-24/editkario-final-project)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Editkaro.in** is a high-performance digital video production agency platform. It merges commercial brand identity with full interactive engineering: real-time video searching, category filtering, live video hover previews, frame-by-frame client review studio, an integrated agency operations dashboard, transparent project scope calculator, and simulated authentication.

---

## 🌐 Live Deployments

- **Primary Production URL (Netlify)**: [https://editkaro-final-project.netlify.app](https://editkaro-final-project.netlify.app)
- **Vercel Mirror**: [https://editkario-final-project.vercel.app](https://editkario-final-project.vercel.app)
- **GitHub Repository**: [https://github.com/Giri-24/editkario-final-project](https://github.com/Giri-24/editkario-final-project)

---

## ✨ Key System Features & Capabilities

### 1. 🎞️ Real Media Assets & Live Video Hover Previews
- **Zero Placeholder Content**: Features 6 real, high-definition MP4 production video edits:
  1. **Short-Form Reel** (`short-video.mp4`): High-cadence TikTok & Instagram Reels edit with animated typography and punchy pacing (92% retention rate).
  2. **YouTube Long-Form** (`long-vedio.mp4`): Cinematic 16:9 documentary essay cut with audio ducking and DaVinci color treatment.
  3. **Gaming Montage** (`gaming-vedio.mp4`): Velocity curves, frame-accurate beat sync, and impact sound design.
  4. **Anime AMV Edit** (`anime_vedio.mp4`): Artistic color re-grading, visual motion flow, and warp transitions.
  5. **Football Sports Reel** (`football-video.mp4`): High-octane 4K sports highlight package with slow-motion speed ramps.
  6. **eCommerce Direct-Response Ad** (`ecommerce-vedio.mp4`): Performance commercial engineered for high ROAS on Meta and TikTok.
- **Hover Mini-Preview**: Hovering over any portfolio card starts an instant muted preview of the real video file!

### 2. 🔍 Real-Time Search & Category Filtering
- **Instant Search Input**: Type keywords like `anime`, `gaming`, `reels`, `football`, or `4k` to filter project cards in real time with an animated empty state.
- **Category Filter Pills**: Interactive filters with real-time project count badges (*All Works (6)*, *Short-form (1)*, *Long-form (1)*, *Gaming (1)*, *Anime (1)*, *Football (1)*, *eCommerce (1)*).

### 3. 🎯 Frame-by-Frame Client Review Studio (Lightbox Modal)
- Clicking any video opens a glass theater player with timecode display (`MM:SS`).
- **Interactive Feedback Drawer**: Clients and editors can pause the video at any second and submit review notes (e.g., *"Enhance bass hit at 00:06"*).
- **Timecode Seeking**: Clicking any existing comment automatically seeks the video to that exact second.
- **Data Persistence**: Review comments persist in `localStorage` across browser refreshes.
- **Keyboard Shortcuts**: <kbd>Esc</kbd> to close modal, <kbd>Spacebar</kbd> to toggle play/pause.

### 4. 📊 Integrated Agency Operations & Admin Dashboard
- Click **"Admin Portal"** in the navigation header to launch the management modal.
- **Live KPI Analytics**: Active Projects, Pipeline Revenue (`$11,840`), Incoming Inquiries, and 48-Hour SLA Compliance.
- **Interactive Inquiries Table**: Displays project submissions from the *Hire Us* form in real time with status toggles (`New` ➔ `In Progress` ➔ `Completed`) and deletion controls.

### 5. ⚡ Transparent Scope & Pricing Calculator
- Real-time quote generator for Short-Form ($120/ea), YouTube Long-Form ($380/ea), and Commercial Ads ($550/ea).
- Deliverables volume slider (1 to 20 videos) with add-on checkboxes (3D Motion Titles, Foley Sound Mix, 24h Rush).
- **1-Click Pre-fill**: Clicking **"Book Project with This Scope"** automatically pre-fills the *Hire Us* form with the calculated budget and target format.

### 6. 🔐 Simulated Authentication System
- Integrated Auth Modal with **1-Click Demo Profiles**:
  - `Login as Client (Sarah Chen)`
  - `Login as Lead Editor (Marcus Vance)`
- Updates header navigation badges and personalizes review comments dynamically.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Structure & Semantics** | HTML5, Semantic Elements, OpenGraph Protocol, Schema.org JSON-LD |
| **Styling & Theme** | CSS3 Custom Properties (Variables), Flexbox, CSS Grid, Glassmorphism, CSS Animations |
| **Interactivity** | Vanilla JavaScript (ES6+), DOM API, HTML5 Video API, `localStorage` Persistence |
| **Typography & Icons** | Google Fonts (`Outfit` & `Inter`), Font Awesome 6.5.1 |
| **Hosting & CI/CD** | Netlify, Vercel, GitHub Actions (`.github/workflows/ci.yml`) |

---

## 📁 Repository Structure

```
editkario/
├── index.html                  # Main production application (Portfolio, Review Studio, Admin Dashboard)
├── contact.html                # Dedicated project inquiry page
├── style.css                   # Complete design system & responsive styling
├── script.js                   # Interactive client-side engine (Search, Lightbox, Admin, Auth)
├── favicon.svg                 # Custom agency vector favicon
├── netlify.toml                # Netlify instant static deploy config
├── vercel.json                 # Vercel clean URL & deployment preset
├── .github/workflows/ci.yml    # Automated production deployment verification
│
├── # Real Production Media Assets
├── short-video.mp4 & short-video-thumbnail.jpg
├── long-vedio.mp4 & long-vedio-thumbnail.jpg
├── gaming-vedio.mp4 & gaming-video-thumbnail.jpg
├── anime_vedio.mp4 & anime-video-thumbnail.jpg
├── football-video.mp4 & football-thumbnail.jpg
├── ecommerce-vedio.mp4 & ecommerce-thumbnail.jpg
├── background-image.jpg
└── ecommerce_bussiness.jpg
```

---

## 🎯 Interview Q&A Alignment Cheatsheet

This project directly answers the interview preparation questions for the Editkaro project:

1. **What is your project about?**  
   *Editkaro.in is a professional digital agency platform connecting video editors with clients through an interactive showcase, real-time search, and a collaborative client review studio.*
2. **What makes your project unique?**  
   *Unlike typical static academic projects, Editkaro.in is built as an actual agency service model: it features live video hover previews, an integrated operations dashboard for managing inquiries, and timestamped client review tooling.*
3. **What technologies did you use?**  
   *HTML5 semantic structure, CSS3 custom variables and glassmorphism, and ES6 JavaScript with HTML5 Video and Web Storage APIs.*
4. **How did you ensure responsiveness?**  
   *Using mobile-first CSS Grid and Flexbox with responsive media queries (`max-width: 1024px` and `768px`) and touch-friendly controls.*
5. **How would you scale this in production?**  
   *The client-side state model can transition to Node.js / Express with MongoDB or PostgreSQL, backed by AWS S3 or Cloudflare R2 for multi-gigabyte raw video uploads.*

---

## 💻 Local Quickstart

No dependencies, node_modules, or build steps required. Simply clone and open:

```bash
# Clone the repository
git clone https://github.com/Giri-24/editkario-final-project.git
cd editkario-final-project

# Open index.html in your preferred browser
open index.html   # On macOS
start index.html  # On Windows
```

---

© 2026 **Editkaro.in**. All Rights Reserved. Engineered for High Retention.
