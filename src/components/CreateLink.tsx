import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { useHistory } from "react-router";
import { POST_MUTATION } from "../mutations";

const CreateLink: React.FC = () => {
  const [description, setDescription] = useState<string>();
  const [url, setUrl] = useState<string>();

  const history = useHistory();

  return (
    <div>
      <div className='flex flex-column mt3'>
        <input
          className='mb2'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type='text'
          placeholder='A description for the link'
        />
        <input
          className='mb2'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type='text'
          placeholder='The URL for the link'
        />
      </div>
      <Mutation
        mutation={POST_MUTATION}
        variables={{ description, url }}
        onCompleted={() => history.push("/")}
      >
        {(postMutation: any) => <button onClick={postMutation}>Submit</button>}
      </Mutation>
    </div>
  );
};

export default CreateLink;
