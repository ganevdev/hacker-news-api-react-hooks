import './App.css';

import React, { useEffect, useState } from 'react';

const fetchHNApi = async search => {
  let result = await fetch(
    `https://hn.algolia.com/api/v1/search?query=${search}`
  );
  result = await result.json();
  if (!result || !result.length === 0) throw new Error();
  return result;
};

const App = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [search, setSearch] = useState('redux');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    //
    try {
      const hnData = fetchHNApi(search);
      setData(hnData);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
    //
  }, [search]);

  return (
    <>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        type="text"
      />
      <button type="button" onClick={() => setSearch(query)}>
        Search
      </button>
      {isError && <div>Something went wrong...</div>}
      {isLoading || !isError ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default App;
