# ⚡ The Subreddit Vibe Check

A modern, responsive React + Vite web application for real-time Reddit sentiment analysis and visual dashboard analytics.

![The Subreddit Vibe Check](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Sentiment Analysis](https://img.shields.io/badge/AFINN-165-emerald?style=flat-square)

---

## 🌟 Overview

**The Subreddit Vibe Check** allows users to analyze the community sentiment of any public subreddit in real-time. By fetching the top 50 hot posts via Reddit's JSON API, the app evaluates post titles using the `sentiment` package (AFINN-165 vocabulary), categorizing them into **Positive**, **Negative**, and **Neutral** sentiment metrics.

---

## ✨ Features

- 🔍 **Subreddit Input & Search**: Search any public subreddit (e.g. `reactjs`, `javascript`, `webdev`) with instant validation and quick preset chips.
- ⚡ **Real-time Reddit Data Fetching**: Retrieves top 50 hot posts directly via public JSON endpoint with graceful error handling (404s, network errors, empty subreddits).
- 🧠 **Sentiment Analysis**: Uses the `sentiment` npm package to assign AFINN sentiment scores, positive/negative keyword flags, and labels.
- 📊 **Dashboard & Metrics**: Visual summary cards for Total Analyzed Posts, Positive Count, Negative Count, and Neutral Count with percentage breakdowns.
- 📈 **Interactive Distribution Chart**: Recharts doughnut visualization with custom tooltips, vibe status badge, and legend.
- 📋 **Filterable Posts Table**: Searchable table displaying Post Title, Sentiment Score, Sentiment Label, Keyword Tags, Reddit Upvotes, Comments, and direct links to Reddit.
- 💎 **Modern UI/UX**: Dark mode glassmorphic interface with vibrant colors, responsive design, and smooth transitions.

---

## 📁 Project Structure

```
subreddit-vibe-check/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── components/
    │   ├── SearchBar.jsx      # Subreddit input, quick tags, submit handler
    │   ├── StatsCards.jsx     # Summary cards for sentiment totals & percentages
    │   ├── SentimentChart.jsx # Interactive Recharts distribution doughnut chart
    │   └── PostsTable.jsx     # Detailed posts table with filter & search
    ├── services/
    │   └── redditApi.js       # Reddit API fetcher and sentiment analysis logic
    ├── App.jsx                # Main application state and layout
    ├── App.css                # Global styles, variables, and animations
    └── main.jsx               # React entry point
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)
- `npm` or `yarn`

### 1. Installation

Clone the repository and install dependencies:

```bash
cd subreddit-vibe-check
npm install
```

### 2. Running Locally

Start the local development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

### 3. Production Build

To build the application for production:

```bash
npm run build
```

To preview the built application locally:

```bash
npm run preview
```

---

## 🌐 Deploying on Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```

2. Run Vercel deployment command inside the project root:
   ```bash
   vercel
   ```

3. Follow the CLI prompts:
   - Set up and deploy: `Y`
   - Scope: *Select your team or account*
   - Link to existing project: `N`
   - Project name: `subreddit-vibe-check`
   - Directory location: `./`
   - Auto-detected Vite settings: Press `Enter` to confirm

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub & Vercel Dashboard

1. Push this project repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Subreddit Vibe Check"
   git branch -M main
   git remote add origin https://github.com/Nikita127804/subreddit-vibe-check.git
   git push -u origin main
   ```

2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `subreddit-vibe-check` GitHub repository.
4. Framework Preset will automatically be detected as **Vite**.
5. Click **"Deploy"**.

---

## 🧪 Tech Stack & Libraries

- **Frontend**: React 18, Vite
- **Styling**: Modern CSS with CSS Variables & Glassmorphism
- **Sentiment Analysis**: `sentiment` (AFINN-165)
- **Charts**: `recharts`
- **Icons**: `lucide-react`
- **Data Source**: Reddit Public JSON API (`https://www.reddit.com/r/{subreddit}/hot.json?limit=50`)

---

## 📄 License

MIT License &copy; 2026. Free to use for personal and educational purposes.
