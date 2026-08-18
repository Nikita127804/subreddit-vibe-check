import React from 'react';
import { Layers, Smile, Frown, Meh, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatsCards = ({ stats }) => {
  if (!stats) return null;

  const {
    totalPosts = 0,
    positiveCount = 0,
    negativeCount = 0,
    neutralCount = 0,
    positivePercent = 0,
    negativePercent = 0,
    neutralPercent = 0,
    avgScore = 0,
  } = stats;

  const cards = [
    {
      id: 'stat-total',
      title: 'Total Analyzed',
      value: totalPosts,
      subtitle: `Avg Score: ${avgScore > 0 ? '+' : ''}${avgScore}`,
      icon: Layers,
      colorClass: 'card-total',
      badgeClass: 'badge-neutral',
      percentage: '100%',
    },
    {
      id: 'stat-positive',
      title: 'Positive Sentiment',
      value: positiveCount,
      subtitle: `${positivePercent}% of posts`,
      icon: Smile,
      trendIcon: TrendingUp,
      colorClass: 'card-positive',
      badgeClass: 'badge-positive',
      percentage: `${positivePercent}%`,
    },
    {
      id: 'stat-negative',
      title: 'Negative Sentiment',
      value: negativeCount,
      subtitle: `${negativePercent}% of posts`,
      icon: Frown,
      trendIcon: TrendingDown,
      colorClass: 'card-negative',
      badgeClass: 'badge-negative',
      percentage: `${negativePercent}%`,
    },
    {
      id: 'stat-neutral',
      title: 'Neutral Sentiment',
      value: neutralCount,
      subtitle: `${neutralPercent}% of posts`,
      icon: Meh,
      trendIcon: Minus,
      colorClass: 'card-neutral-light',
      badgeClass: 'badge-neutral',
      percentage: `${neutralPercent}%`,
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div key={card.id} className={`stat-card ${card.colorClass}`} id={card.id}>
            <div className="stat-card-header">
              <span className="stat-title">{card.title}</span>
              <div className="stat-icon-wrapper">
                <IconComponent size={22} />
              </div>
            </div>

            <div className="stat-card-body">
              <div className="stat-value">{card.value}</div>
              <div className="stat-footer">
                <span className={`stat-badge ${card.badgeClass}`}>
                  {card.percentage}
                </span>
                <span className="stat-subtitle">{card.subtitle}</span>
              </div>
            </div>

            <div className="stat-progress-bg">
              <div
                className="stat-progress-fill"
                style={{ width: card.percentage }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
