import React, {useEffect,useState } from 'react';
import {getStats} from '../api/shorten';
import {Log} from '../../../../Logging Middleware/logging.js';
;

const UrlList = ({ shortCode, apiToken }) => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getStats(shortCode);
        setStats(data);
        await Log(
          "frontend",
          "info",
          "urllist",
          `Fetched analytics for short code: ${shortCode}`,
          apiToken
        );
      } catch (err) {
        setError(err.message);
        await Log(
          "frontend",
          "error",
          "urllist",
          `Error fetching stats for ${shortCode}: ${err.message}`,
          apiToken
        );
      }
    }

    if (shortCode) {
      fetchStats();
    }
  }, [shortCode, apiToken]);

  if (error) return <p>Error: {error}</p>;
  if (!stats) return <p>Loading stats...</p>;

  return (
    <div>
      <h3>Stats for {shortCode}</h3>
      <p>Original URL: {stats.originalUrl}</p>
      <p>Clicks: {stats.clicks}</p>
      <p>Valid Until: {stats.expiry}</p>
    </div>
  );
};

export default UrlList;
