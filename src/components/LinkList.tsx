import React, { useCallback } from 'react';
import { Query } from 'react-apollo';
import Link from './Link';
import { FEED_QUERY } from '../mutations';

const LinkList: React.FC = () => {
  const updateCacheAfterVote = useCallback((store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY });

    const votedLink = data.feed.links.find((link: any) => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: FEED_QUERY, data });
  }, []);

  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }: any) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        return (
          <div>
            {data.feed.links.map((link: any, index: number) => (
              <Link key={link.id} {...{ link, index, updateCacheAfterVote }} />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default LinkList;
