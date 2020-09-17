import React from "react";
import { Query } from "react-apollo";
import Link from "./Link";
import { LinkAttr } from "../interfaces";
import { FEED_QUERY } from "../mutations";

const LinkList: React.FC = () => {
  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }: any) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        return (
          <div>
            {data.feed.links.map((link: LinkAttr) => (
              <Link key={link.id} {...{ link }} />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default LinkList;
