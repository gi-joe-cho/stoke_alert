import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

class NewPost extends Component {
  render() {
    return (
      <Segment className="new-post-ocean-pic">
        <Segment className="home-row" stacked>
          <div>N E W P O S T</div>
        </Segment>
      </Segment>
    );
  }
}

export default NewPost;