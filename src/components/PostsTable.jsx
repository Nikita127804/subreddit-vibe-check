import React, { useState, useMemo } from 'react';
import { ExternalLink, Search, ArrowUpDown, ThumbsUp, MessageSquare, Tag } from 'lucide-react';

const PostsTable = ({ posts }) => {
  const [filter, setFilter] = useState('ALL'); // ALL, Positive, Negative, Neutral
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('score-desc'); // score-desc, score-asc, reddit-score

  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    return posts
      .filter((post) => {
        // Label filter
        if (filter !== 'ALL' && post.label !== filter) return false;
        // Text search filter
        if (searchQuery.trim()) {
          return post.title.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'score-desc') return b.score - a.score;
        if (sortBy === 'score-asc') return a.score - b.score;
        if (sortBy === 'reddit-score') return b.redditScore - a.redditScore;
        return 0;
      });
  }, [posts, filter, searchQuery, sortBy]);

  if (!posts || posts.length === 0) return null;

  return (
    <div className="posts-table-section card" id="posts-table-container">
      <div className="table-controls-header">
        <div className="table-title">
          <h2>Fetched Posts Analysis</h2>
          <span className="results-count">
            Showing {filteredPosts.length} of {posts.length} posts
          </span>
        </div>

        <div className="controls-group">
          {/* Search inside posts */}
          <div className="table-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search post titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="table-search-input"
            />
          </div>

          {/* Filter Pills */}
          <div className="filter-pills">
            {['ALL', 'Positive', 'Negative', 'Neutral'].map((lbl) => (
              <button
                key={lbl}
                type="button"
                className={`filter-btn ${filter === lbl ? 'active' : ''}`}
                onClick={() => setFilter(lbl)}
              >
                {lbl}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="sort-dropdown-wrapper">
            <ArrowUpDown size={16} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="score-desc">Sentiment Score (High to Low)</option>
              <option value="score-asc">Sentiment Score (Low to High)</option>
              <option value="reddit-score">Reddit Upvotes</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="posts-table">
          <thead>
            <tr>
              <th className="col-rank">#</th>
              <th className="col-title">Post Title</th>
              <th className="col-score">Score</th>
              <th className="col-label">Sentiment Label</th>
              <th className="col-words">Detected Keywords</th>
              <th className="col-stats">Reddit Stats</th>
              <th className="col-link">Link</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-results-td">
                  No posts match your current filter or search criteria.
                </td>
              </tr>
            ) : (
              filteredPosts.map((post, idx) => {
                let badgeClass = 'badge-neutral';
                if (post.label === 'Positive') badgeClass = 'badge-positive';
                if (post.label === 'Negative') badgeClass = 'badge-negative';

                return (
                  <tr key={post.id} className="table-row">
                    <td className="col-rank">{idx + 1}</td>
                    <td className="col-title">
                      <div className="post-title-content">
                        <a
                          href={post.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="post-title-link"
                        >
                          {post.title}
                        </a>
                        <span className="post-author">by u/{post.author}</span>
                      </div>
                    </td>
                    <td className="col-score">
                      <span className={`score-pill ${post.score > 0 ? 'pos' : post.score < 0 ? 'neg' : 'neu'}`}>
                        {post.score > 0 ? `+${post.score}` : post.score}
                      </span>
                    </td>
                    <td className="col-label">
                      <span className={`badge ${badgeClass}`}>{post.label}</span>
                    </td>
                    <td className="col-words">
                      <div className="keywords-tags">
                        {post.positiveWords.map((word, wIdx) => (
                          <span key={`pos-${wIdx}`} className="tag pos-tag">
                            +{word}
                          </span>
                        ))}
                        {post.negativeWords.map((word, wIdx) => (
                          <span key={`neg-${wIdx}`} className="tag neg-tag">
                            -{word}
                          </span>
                        ))}
                        {post.positiveWords.length === 0 && post.negativeWords.length === 0 && (
                          <span className="no-words">-</span>
                        )}
                      </div>
                    </td>
                    <td className="col-stats">
                      <div className="reddit-metrics">
                        <span title="Upvotes">
                          <ThumbsUp size={13} /> {post.redditScore}
                        </span>
                        <span title="Comments">
                          <MessageSquare size={13} /> {post.numComments}
                        </span>
                      </div>
                    </td>
                    <td className="col-link">
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="external-link-btn"
                        title="View post on Reddit"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostsTable;
