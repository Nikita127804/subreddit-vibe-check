import React, { useState } from 'react';
import { Search, Sparkles, X, RefreshCw } from 'lucide-react';

const PRESET_SUBREDDITS = [
  'reactjs',
  'javascript',
  'webdev',
  'technology',
  'gaming',
  'wallstreetbets',
];

const SearchBar = ({ onSearch, isLoading, initialValue = 'reactjs' }) => {
  const [inputVal, setInputVal] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  const handlePresetClick = (sub) => {
    setInputVal(sub);
    onSearch(sub);
  };

  const handleClear = () => {
    setInputVal('');
  };

  return (
    <div className="search-section card">
      <form onSubmit={handleSubmit} className="search-form" id="subreddit-form">
        <div className="input-group">
          <span className="input-prefix">r/</span>
          <input
            id="subreddit-input"
            type="text"
            className="search-input"
            placeholder="Enter subreddit (e.g. reactjs, webdev)"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isLoading}
            autoComplete="off"
            aria-label="Subreddit name input"
          />
          {inputVal && !isLoading && (
            <button
              type="button"
              className="clear-btn"
              onClick={handleClear}
              title="Clear input"
              aria-label="Clear input"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          type="submit"
          id="analyze-button"
          className="analyze-btn primary-gradient"
          disabled={isLoading || !inputVal.trim()}
          aria-label="Analyze subreddit sentiment"
        >
          {isLoading ? (
            <>
              <RefreshCw className="spin-icon" size={18} />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Analyze</span>
            </>
          )}
        </button>
      </form>

      <div className="preset-tags-container">
        <span className="preset-label">Trending Subreddits:</span>
        <div className="preset-tags">
          {PRESET_SUBREDDITS.map((sub) => (
            <button
              key={sub}
              type="button"
              className={`preset-chip ${inputVal.toLowerCase() === sub ? 'active' : ''}`}
              onClick={() => handlePresetClick(sub)}
              disabled={isLoading}
            >
              r/{sub}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
