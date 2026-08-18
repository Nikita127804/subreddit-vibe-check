import Sentiment from 'sentiment';

// Initialize Sentiment analyzer instance
const sentimentAnalyzer = new Sentiment();

/**
 * Clean subreddit input string
 * Removes leading 'r/' or '/r/' and trims whitespace
 * @param {string} input 
 * @returns {string} Cleaned subreddit name
 */
export const cleanSubredditName = (input) => {
  if (!input) return '';
  let cleaned = input.trim();
  cleaned = cleaned.replace(/^\/?r\//i, '');
  return cleaned.trim();
};

/**
 * Pre-defined mock data for popular subreddits to ensure seamless UI fallback
 */
const MOCK_DATA = {
  reactjs: [
    { id: 'react-1', title: 'React 19 Candidate is out! Server Actions and Use Hook complete guide', score: 1420, num_comments: 312, author: 'dan_abramov_fan', created_utc: Date.now() / 1000 - 3600 * 4 },
    { id: 'react-2', title: 'Why I replaced Redux Toolkit with Zustand in our enterprise app', score: 850, num_comments: 184, author: 'frontend_arch', created_utc: Date.now() / 1000 - 3600 * 8 },
    { id: 'react-3', title: 'Struggling with useEffect re-renders and memory leaks in React 18', score: 230, num_comments: 95, author: 'react_learner', created_utc: Date.now() / 1000 - 3600 * 12 },
    { id: 'react-4', title: 'Vite + React is insanely fast compared to Create React App', score: 2100, num_comments: 420, author: 'vite_dev', created_utc: Date.now() / 1000 - 3600 * 18 },
    { id: 'react-5', title: 'Next.js App Router performance issues and how we fixed them', score: 620, num_comments: 156, author: 'nextjs_guru', created_utc: Date.now() / 1000 - 3600 * 24 },
    { id: 'react-6', title: 'Is Tailwind CSS still the best choice for React components in 2026?', score: 410, num_comments: 280, author: 'css_enjoyer', created_utc: Date.now() / 1000 - 3600 * 30 },
    { id: 'react-7', title: 'Building an accessible UI component library from scratch using Radix UI', score: 530, num_comments: 67, author: 'a11y_dev', created_utc: Date.now() / 1000 - 3600 * 36 },
    { id: 'react-8', title: 'Frustrated with hydration mismatch errors in SSR applications', score: 310, num_comments: 125, author: 'ssr_headache', created_utc: Date.now() / 1000 - 3600 * 42 },
    { id: 'react-9', title: 'How we reduced our React bundle size by 65% with dynamic code splitting', score: 940, num_comments: 112, author: 'perf_ninja', created_utc: Date.now() / 1000 - 3600 * 48 },
    { id: 'react-10', title: 'React Query vs SWR for real-time dashboard data fetching', score: 380, num_comments: 89, author: 'data_fetcher', created_utc: Date.now() / 1000 - 3600 * 54 },
    { id: 'react-11', title: 'Warning: avoid this common memory leak when memoizing callbacks', score: 710, num_comments: 143, author: 'code_reviewer', created_utc: Date.now() / 1000 - 3600 * 60 },
    { id: 'react-12', title: 'Building complex data tables with TanStack Table in React', score: 490, num_comments: 76, author: 'grid_master', created_utc: Date.now() / 1000 - 3600 * 66 },
    { id: 'react-13', title: 'Best animation libraries for React: Framer Motion vs GSAP', score: 830, num_comments: 98, author: 'motion_designer', created_utc: Date.now() / 1000 - 3600 * 72 },
    { id: 'react-14', title: 'Showcase: I built a real-time Subreddit Sentiment Analysis dashboard!', score: 1560, num_comments: 245, author: 'vibe_check_creator', created_utc: Date.now() / 1000 - 3600 * 78 }
  ],
  javascript: [
    { id: 'js-1', title: 'JavaScript ES2026 features officially approved! Here is what is new', score: 3400, num_comments: 512, author: 'tc39_watcher', created_utc: Date.now() / 1000 - 3600 * 5 },
    { id: 'js-2', title: 'Why JavaScript is still the king of web development after 30 years', score: 1890, num_comments: 640, author: 'js_veteran', created_utc: Date.now() / 1000 - 3600 * 10 },
    { id: 'js-3', title: 'Deep dive into JavaScript event loop, microtasks, and macrotasks', score: 1120, num_comments: 145, author: 'async_pro', created_utc: Date.now() / 1000 - 3600 * 15 },
    { id: 'js-4', title: 'Node.js vs Bun vs Deno performance benchmark comparison 2026', score: 2450, num_comments: 380, author: 'backend_guy', created_utc: Date.now() / 1000 - 3600 * 20 },
    { id: 'js-5', title: 'Struggling with prototype inheritance in legacy codebase', score: 150, num_comments: 92, author: 'refactor_dev', created_utc: Date.now() / 1000 - 3600 * 25 }
  ],
  webdev: [
    { id: 'web-1', title: 'Modern CSS features in 2026 that eliminated the need for JS utilities', score: 2100, num_comments: 310, author: 'css_wizard', created_utc: Date.now() / 1000 - 3600 * 6 },
    { id: 'web-2', title: 'Web Vitals optimization guide for 100/100 Lighthouse performance', score: 1540, num_comments: 198, author: 'speed_demon', created_utc: Date.now() / 1000 - 3600 * 14 },
    { id: 'web-3', title: 'Browser compatibility bugs driving developers crazy this month', score: 420, num_comments: 215, author: 'cross_browser', created_utc: Date.now() / 1000 - 3600 * 22 }
  ]
};

/**
 * Generate generic mock posts for subreddits not in predefined list
 */
const generateGenericMockPosts = (sub) => {
  const templates = [
    { title: `Welcome to the official r/${sub} community discussion!`, score: 450, comments: 85, offsetHours: 2 },
    { title: `What are your favorite tools and techniques for ${sub} in 2026?`, score: 820, comments: 190, offsetHours: 6 },
    { title: `Major breakthrough and progress announced in r/${sub}`, score: 1250, comments: 240, offsetHours: 12 },
    { title: `Having frustrating issues with ${sub} setup, looking for help`, score: 180, comments: 64, offsetHours: 18 },
    { title: `Top 10 best practices every ${sub} developer should follow`, score: 960, comments: 140, offsetHours: 24 },
    { title: `Awesome open source project built for r/${sub}`, score: 1100, comments: 175, offsetHours: 30 },
    { title: `Critique my project: built a modern web dashboard for ${sub}`, score: 670, comments: 92, offsetHours: 36 },
    { title: `Warning: breaking changes announced for ${sub} ecosystem`, score: 540, comments: 130, offsetHours: 42 },
    { title: `How to optimize performance for large scale ${sub} applications`, score: 890, comments: 115, offsetHours: 48 },
    { title: `Comprehensive beginner guide to mastering ${sub}`, score: 1350, comments: 210, offsetHours: 54 }
  ];

  return templates.map((tpl, i) => ({
    id: `mock-${sub}-${i}`,
    title: tpl.title,
    score: tpl.score,
    num_comments: tpl.comments,
    author: `${sub}_enthusiast_${i + 1}`,
    created_utc: Date.now() / 1000 - 3600 * tpl.offsetHours
  }));
};

/**
 * Helper to fetch raw Reddit JSON payload with proxy fallbacks
 */
const fetchRedditJsonWithFallbacks = async (subreddit) => {
  const cleanSub = subreddit.toLowerCase();
  const targetUrl = `https://www.reddit.com/r/${encodeURIComponent(subreddit)}/hot.json?limit=50`;

  const fetchEndpoints = [];

  // Development Vite Proxy
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    fetchEndpoints.push(`/reddit-api/r/${encodeURIComponent(subreddit)}/hot.json?limit=50`);
  }

  fetchEndpoints.push(targetUrl);
  fetchEndpoints.push(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`);
  fetchEndpoints.push(`https://corsproxy.io/?${encodeURIComponent(targetUrl)}`);

  for (const endpoint of fetchEndpoints) {
    try {
      const response = await fetch(endpoint, {
        headers: { 'Accept': 'application/json' },
      });

      if (response.status === 404) {
        throw new Error(`Subreddit "r/${subreddit}" was not found. Please check the spelling.`);
      }

      // If Cloudflare blocks request with HTTP 403 or 429, try next fallback
      if (response.status === 403 || response.status === 429 || !response.ok) {
        continue;
      }

      const text = await response.text();

      // Check if response is HTML Cloudflare challenge page
      if (text.trim().startsWith('<')) {
        continue;
      }

      const data = JSON.parse(text);

      if (data && data.data && Array.isArray(data.data.children) && data.data.children.length > 0) {
        return {
          children: data.data.children.map(item => item.data),
          isFallback: false
        };
      }
    } catch (err) {
      if (err.message.includes('not found')) {
        throw err;
      }
      // Continue to next endpoint
    }
  }

  // Fallback dataset when Reddit Cloudflare blocks live API
  const rawPosts = MOCK_DATA[cleanSub] || generateGenericMockPosts(subreddit);
  return {
    children: rawPosts,
    isFallback: true
  };
};

/**
 * Fetches hot posts from Reddit API and runs sentiment analysis on titles.
 * @param {string} rawSubreddit - Name of the subreddit
 * @returns {Promise<{posts: Array, stats: Object, subreddit: string, isFallback: boolean}>}
 */
export const fetchAndAnalyzeSubreddit = async (rawSubreddit) => {
  const subreddit = cleanSubredditName(rawSubreddit);

  if (!subreddit) {
    throw new Error('Please enter a valid subreddit name.');
  }

  let childrenData = [];
  let isFallback = false;
  
  try {
    const result = await fetchRedditJsonWithFallbacks(subreddit);
    childrenData = result.children;
    isFallback = result.isFallback;
  } catch (err) {
    if (err.message.includes('not found')) {
      throw err;
    }
    throw new Error(`Failed to fetch data for "r/${subreddit}". (${err.message})`);
  }

  if (!childrenData || childrenData.length === 0) {
    throw new Error(`No posts found in "r/${subreddit}". The subreddit might be empty.`);
  }

  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;
  let totalScore = 0;

  const posts = childrenData.map((postData, index) => {
    const title = postData.title || 'Untitled Post';

    const result = sentimentAnalyzer.analyze(title);
    const score = result.score;

    let label = 'Neutral';
    if (score > 0) {
      label = 'Positive';
      positiveCount++;
    } else if (score < 0) {
      label = 'Negative';
      negativeCount++;
    } else {
      neutralCount++;
    }

    totalScore += score;

    return {
      id: postData.id || `post-${index}`,
      title: title,
      score: score,
      label: label,
      comparative: parseFloat(result.comparative.toFixed(2)),
      positiveWords: result.positive || [],
      negativeWords: result.negative || [],
      redditScore: postData.score || 0,
      numComments: postData.num_comments || 0,
      author: postData.author || 'anonymous',
      permalink: postData.permalink ? `https://reddit.com${postData.permalink}` : `https://reddit.com/r/${subreddit}`,
      createdUtc: postData.created_utc || Date.now() / 1000,
      thumbnail: postData.thumbnail && postData.thumbnail.startsWith('http') ? postData.thumbnail : null,
    };
  });

  const totalPosts = posts.length;
  const avgScore = totalPosts > 0 ? parseFloat((totalScore / totalPosts).toFixed(2)) : 0;

  const stats = {
    totalPosts,
    positiveCount,
    negativeCount,
    neutralCount,
    avgScore,
    positivePercent: totalPosts > 0 ? Math.round((positiveCount / totalPosts) * 100) : 0,
    negativePercent: totalPosts > 0 ? Math.round((negativeCount / totalPosts) * 100) : 0,
    neutralPercent: totalPosts > 0 ? Math.round((neutralCount / totalPosts) * 100) : 0,
  };

  return {
    posts,
    stats,
    subreddit,
    isFallback
  };
};
