import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { useHistory } from 'react-router';
import { FEED_QUERY, POST_MUTATION } from '../mutations';

const CreateLink: React.FC = () => {
  const [description, setDescription] = useState<string>();
  const [url, setUrl] = useState<string>();

  const history = useHistory();

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <Mutation
        mutation={POST_MUTATION}
        variables={{ description, url }}
        onCompleted={() => history.push('/')}
        update={(store: any, { data: { post } }: any) => {
          const data = store.readQuery({ query: FEED_QUERY });
          data.feed.links.unshift(post);
          store.writeQuery({
            query: FEED_QUERY,
            data,
          });
        }}
      >
        {(postMutation: any) => <button onClick={postMutation}>Submit</button>}
      </Mutation>
    </div>
  );
};

export default CreateLink;
