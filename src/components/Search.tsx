import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import { FEED_SEARCH_QUERY } from '../mutations';
import Link from './Link';

const Search: React.FC = ({ client }: any) => {
  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState<string>();

  const executeSearch = async () => {
    const result = await client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
    });
    setLinks(result.data.feed.links);
  };

  return (
    <div>
      <div>
        Search
        <input type="text" onChange={(e) => setFilter(e.target.value)} />
        <button onClick={() => executeSearch()}>OK</button>
      </div>
      {links.map((link: any, index: number) => (
        <Link key={link.id} {...{ link, index }} />
      ))}
    </div>
  );
};

export default withApollo(Search);
