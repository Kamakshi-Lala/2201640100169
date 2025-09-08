import React,{useState} from 'react';
import{shortenUrl} from '../api/shorten';
import{Log} from '../../../../Logging Middleware/logging.js';

const ShortenerForm = ({ apiToken }) => {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [validity, setValidity] = useState(30);
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await shortenUrl(url, customCode||null, validity||30);

      if (data.shortUrl) {
        setShortUrl(data.shortUrl);
        setError('');

        await Log(
          "frontend",
          "info",
          "shortenerform",
          `Short URL created: ${data.shortUrl} for ${url}`,
          apiToken
        );
        } 
        else {
            throw new Error("Invalid response from API");
        }
    } catch (err) {
      setError(err.message);
      await Log(
        "frontend",
        "error",
        "shortenerform",
        `Failed to create short URL for ${url}: ${err.message}`,
        apiToken
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <input
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          placeholder="Custom code (optional)"
        />
        <input
          type="number"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          placeholder="Validity (minutes)"
        />
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && <p>Short URL: {shortUrl}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default ShortenerForm;
