import React,{useState} from 'react';
import ShortenerForm from '../components/ShortenerForm';
import UrlList from '../components/UrlList';

const HomePage=({ apiToken }) => {
  const [lastShortCode, setLastShortCode] = useState('');

  const handleShortUrlCreated = (shortUrl) => {
    const parts = shortUrl.split('/');
    setLastShortCode(parts[parts.length - 1]);
  };

  return (
    <div>
      <h1>React URL Shortener</h1>
      <ShortenerForm
        apiToken={apiToken}
        onShortUrlCreated={handleShortUrlCreated}
      />

      {lastShortCode && (
        <div>
          <h2>Analytics for Last Created Link</h2>
          <UrlList shortCode={lastShortCode} apiToken={apiToken} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
