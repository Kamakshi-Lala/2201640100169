import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import {Log} from '../../../../Logging Middleware/logging.js';

const RedirectHandler = ({ apiToken }) => {
  const { code } = useParams();
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAndRedirect() {
      try {
        const res = await fetch(`https://api.example.com/r/${code}`);
        if (!res.ok) throw new Error("Invalid or expired short URL");

        const data = await res.json();
        const originalUrl = data.originalUrl;

        await Log(
          "frontend",
          "info",
          "redirecthandler",
          `Redirecting short code ${code} to ${originalUrl}`,
          apiToken
        );

        window.location.replace(originalUrl);
      } catch (err) {
        setError(err.message);
        await Log(
          "frontend",
          "error",
          "redirecthandler",
          `Failed to redirect ${code}: ${err.message}`,
          apiToken
        );
      }
    }

    fetchAndRedirect();
  }, [code, apiToken]);

  return (
    <div>
      {error ? <p style={{ color:'red'}}>Error: {error}</p>:<p>Redirecting..</p>}
    </div>
  );
};

export default RedirectHandler;
