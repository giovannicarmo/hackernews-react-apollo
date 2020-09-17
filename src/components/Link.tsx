import React from "react";

const Link: React.FC = (props: any) => {
  return (
    <div>
      <div>
        {props.link.description} ({props.link.url})
      </div>
    </div>
  );
};

export default Link;
