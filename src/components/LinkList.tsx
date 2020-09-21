import React, { useCallback } from "react";
import { Query } from "react-apollo";
import { useHistory } from "react-router";
import { LINKS_PER_PAGE } from "../constants";
import {
  FEED_QUERY,
  NEW_LINKS_SUBSCRIPTION,
  NEW_VOTES_SUBSCRIPTION,
} from "../mutations";
import Link from "./Link";

const LinkList: React.FC = ({ match }: any) => {
  const history = useHistory();

  const getQueryVariables = () => {
    const isNewPage = window.location.pathname.includes("new");
    const page = parseInt(match.params.page, 10);

    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const first = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = isNewPage ? "createdAt_DESC" : null;
    return { first, skip, orderBy };
  };

  const subscribeToNewLinks = (subscribeToMore: any) => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        const newLink = subscriptionData.data.newLink;
        const exists = prev.feed.links.find(({ id }: any) => id === newLink.id);
        if (exists) return prev;

        return Object.assign({}, prev, {
          feed: {
            links: [newLink, ...prev.feed.links],
            count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename,
          },
        });
      },
    });
  };

  const subscribeToNewVotes = (subscribeToMore: any) => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION,
    });
  };

  const updateCacheAfterVote = useCallback(
    (store, createVote, linkId) => {
      const isNewPage = window.location.pathname.includes("new");
      const page = parseInt(match.params.page, 10);

      const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
      const first = isNewPage ? LINKS_PER_PAGE : 100;
      const orderBy = isNewPage ? "createdAt_DESC" : null;
      const data = store.readQuery({
        query: FEED_QUERY,
        variables: { first, skip, orderBy },
      });

      const votedLink = data.feed.links.find((link: any) => link.id === linkId);
      votedLink.votes = createVote.link.votes;
      store.writeQuery({ query: FEED_QUERY, data });
    },
    [match.params.page]
  );

  const getLinksToRender = (data: any) => {
    const isNewPage = window.location.pathname.includes("new");
    if (isNewPage) {
      return data.feed.links;
    }
    const rankedLinks = data.feed.links.slice();
    rankedLinks.sort((l1: any, l2: any) => l2.votes.length - l1.votes.length);
    return rankedLinks;
  };

  const nextPage = (data: any) => {
    const page = parseInt(match.params.page, 10);
    if (page <= data.feed.count / LINKS_PER_PAGE) {
      const nextPage = page + 1;
      history.push(`/new/${nextPage}`);
    }
  };

  const previousPage = () => {
    const page = parseInt(match.params.page, 10);
    if (page > 1) {
      const previousPage = page - 1;
      history.push(`/new/${previousPage}`);
    }
  };

  return (
    <Query query={FEED_QUERY} variables={getQueryVariables()}>
      {({ loading, error, data, subscribeToMore }: any) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        subscribeToNewLinks(subscribeToMore);
        subscribeToNewVotes(subscribeToMore);

        const linksToRender = getLinksToRender(data);
        const isNewPage = window.location.pathname.includes("new");
        const pageIndex = match.params.page
          ? (match.params.page - 1) * LINKS_PER_PAGE
          : 0;

        return (
          <>
            {linksToRender.map((link: any, index: number) => (
              <Link
                key={link.id}
                index={index + pageIndex}
                updateStoreAfterVote={updateCacheAfterVote}
                {...link}
              />
            ))}
            {isNewPage && (
              <div className='flex ml4 mv3 gray'>
                <div className='pointer mr2' onClick={previousPage}>
                  Previous
                </div>
                <div className='pointer' onClick={() => nextPage(data)}>
                  Next
                </div>
              </div>
            )}
          </>
        );
      }}
    </Query>
  );
};

export default LinkList;
