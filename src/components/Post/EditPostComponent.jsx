import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import { withRouter } from 'react-router-dom';

class EditPost extends Component {
  render() {
    return (
      <Segment className="new-post-ocean-pic">
        <Segment className="home-row" stacked>
          <div>E d i t_P o s t_</div>
        </Segment>
      </Segment>
    );
  }
}

export default withRouter(EditPost);