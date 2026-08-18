import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PieChart as PieIcon, Activity } from 'lucide-react';

const COLORS = {
  Positive: '#10b981', // Emerald green
  Negative: '#f43f5e', // Rose red
  Neutral: '#f59e0b',  // Amber yellow
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="custom-chart-tooltip">
        <div className="tooltip-header" style={{ color: data.color }}>
          <span className="tooltip-dot" style={{ backgroundColor: data.color }} />
          <strong>{data.name}</strong>
        </div>
        <div className="tooltip-body">
          <p>Posts: <strong>{data.value}</strong></p>
          <p>Share: <strong>{data.payload.percentage}%</strong></p>
        </div>
      </div>
    );
  }
  return null;
};

const SentimentChart = ({ stats, subreddit }) => {
  if (!stats || stats.totalPosts === 0) return null;

  const data = [
    { name: 'Positive', value: stats.positiveCount, percentage: stats.positivePercent },
    { name: 'Negative', value: stats.negativeCount, percentage: stats.negativePercent },
    { name: 'Neutral', value: stats.neutralCount, percentage: stats.neutralPercent },
  ].filter(item => item.value > 0);

  // Overall Vibe calculation
  let overallVibe = 'Balanced';
  let vibeColor = '#f59e0b';
  let vibeEmoji = '⚖️';

  if (stats.positiveCount > stats.negativeCount + stats.neutralCount) {
    overallVibe = 'Overwhelmingly Positive';
    vibeColor = '#10b981';
    vibeEmoji = '🔥';
  } else if (stats.positiveCount > stats.negativeCount) {
    overallVibe = 'Mostly Positive';
    vibeColor = '#10b981';
    vibeEmoji = '😊';
  } else if (stats.negativeCount > stats.positiveCount) {
    overallVibe = 'Mostly Negative';
    vibeColor = '#f43f5e';
    vibeEmoji = '🌧️';
  }

  return (
    <div className="chart-container card" id="sentiment-chart-card">
      <div className="chart-header">
        <div className="chart-title">
          <PieIcon size={20} className="header-icon" />
          <h2>Sentiment Distribution</h2>
        </div>
        <div className="vibe-badge" style={{ borderColor: vibeColor, color: vibeColor }}>
          <span className="vibe-emoji">{vibeEmoji}</span>
          <span>{overallVibe}</span>
        </div>
      </div>

      <div className="chart-content">
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={105}
                paddingAngle={4}
                dataKey="value"
                animationDuration={800}
              >
                {data.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={COLORS[entry.name]}
                    stroke="rgba(15, 23, 42, 0.6)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 500 }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="chart-center-label">
            <div className="center-score">{stats.avgScore > 0 ? `+${stats.avgScore}` : stats.avgScore}</div>
            <div className="center-text">Avg Score</div>
          </div>
        </div>

        <div className="chart-summary-list">
          <h3>Subreddit Vibe Metrics</h3>
          <div className="summary-item">
            <div className="summary-color-bar" style={{ backgroundColor: COLORS.Positive }} />
            <div className="summary-info">
              <span className="summary-label">Positive Posts</span>
              <span className="summary-detail">{stats.positiveCount} posts ({stats.positivePercent}%)</span>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-color-bar" style={{ backgroundColor: COLORS.Negative }} />
            <div className="summary-info">
              <span className="summary-label">Negative Posts</span>
              <span className="summary-detail">{stats.negativeCount} posts ({stats.negativePercent}%)</span>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-color-bar" style={{ backgroundColor: COLORS.Neutral }} />
            <div className="summary-info">
              <span className="summary-label">Neutral Posts</span>
              <span className="summary-detail">{stats.neutralCount} posts ({stats.neutralPercent}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentChart;
