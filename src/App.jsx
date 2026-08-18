import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import StatsCards from './components/StatsCards';
import SentimentChart from './components/SentimentChart';
import PostsTable from './components/PostsTable';
import { fetchAndAnalyzeSubreddit } from './services/redditApi';
import { Flame, AlertCircle, RefreshCw, BarChart2, Info } from 'lucide-react';
import './App.css';

function App() {
  const [subreddit, setSubreddit] = useState('reactjs');
  const [activeSubreddit, setActiveSubreddit] = useState('reactjs');
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch posts and compute sentiment
  const handleAnalyze = useCallback(async (targetSubreddit) => {
    if (!targetSubreddit || !targetSubreddit.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchAndAnalyzeSubreddit(targetSubreddit);
      setPosts(result.posts);
      setStats(result.stats);
      setActiveSubreddit(result.subreddit);
      setSubreddit(result.subreddit);
      setIsFallback(!!result.isFallback);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while fetching subreddit data.');
      setPosts([]);
      setStats(null);
      setIsFallback(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Default fetch on initial mount
  useEffect(() => {
    handleAnalyze('reactjs');
  }, [handleAnalyze]);

  return (
    <div className="app-container">
      {/* Background ambient light shapes */}
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

      {/* Main Header */}
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-logo">
            <Flame className="flame-icon" size={28} />
          </div>
          <div className="brand-text">
            <h1>The Subreddit Vibe Check</h1>
            <p className="brand-tagline">Real-time Reddit Sentiment Analysis & Dashboard</p>
          </div>
        </div>

        <div className="header-meta">
          <span className="live-pill">
            <span className="pulse-dot" /> Live API Integration
          </span>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="dashboard-content">
        {/* Search Section */}
        <SearchBar
          onSearch={handleAnalyze}
          isLoading={isLoading}
          initialValue={subreddit}
        />

        {/* Error Banner */}
        {error && (
          <div className="error-banner card" role="alert">
            <AlertCircle className="error-icon" size={24} />
            <div className="error-content">
              <h3>Analysis Failed</h3>
              <p>{error}</p>
            </div>
            <button
              type="button"
              className="retry-btn"
              onClick={() => handleAnalyze(subreddit)}
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Spinner State */}
        {isLoading && (
          <div className="loading-state card">
            <div className="spinner-wrapper">
              <RefreshCw className="spin-large" size={40} />
            </div>
            <h2>Analyzing r/{subreddit}...</h2>
            <p>Fetching top 50 hot posts and calculating AFINN sentiment scores</p>
          </div>
        )}

        {/* Results Dashboard */}
        {!isLoading && !error && stats && (
          <div className="dashboard-grid">
            <div className="dashboard-header-info">
              <div>
                <h2>
                  Current Subreddit: <span className="highlight-sub">r/{activeSubreddit}</span>
                </h2>
                {isFallback && (
                  <span className="fallback-badge" title="Reddit API blocked direct fetching (HTTP 403). Displaying sample data.">
                    <Info size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Sample Dataset Mode (Cloudflare Rate Limit)
                  </span>
                )}
              </div>
              <span className="timestamp">
                Analyzed {posts.length} hot posts
              </span>
            </div>

            {/* Summary Cards */}
            <StatsCards stats={stats} />

            {/* Visual Charts */}
            <SentimentChart stats={stats} subreddit={activeSubreddit} />

            {/* Detailed Table */}
            <PostsTable posts={posts} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          The Subreddit Vibe Check &copy; {new Date().getFullYear()} &bull; Built with React, Vite, & Sentiment Analysis
        </p>
      </footer>
    </div>
  );
}

export default App;
