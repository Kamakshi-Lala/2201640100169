import React from 'react';
import { useParams } from 'react-router-dom';
import UrlList from '../components/UrlList';

const StatsPage = ({ apiToken }) => {
  const { code } = useParams();

  return (
    <div>
      <h1>Stats for {code}</h1>
      <UrlList shortCode={code} apiToken={apiToken} />
    </div>
  );
};

export default StatsPage;
