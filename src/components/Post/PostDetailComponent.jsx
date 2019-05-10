import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class NewPost extends Component {
  render() {
    console.log(this.props.location.state);
    return (
      <Segment className="new-post-ocean-pic">
        <Segment className="home-row" stacked>
          <div>
            <h1>
              P o s t_D e t a i l_
            </h1>
            <h3>
              {this.props.location.state.post.city}, 
              { ' ' + this.props.location.state.post.state}
              
            </h3>
            <p>
              l a t : {this.props.location.state.post.lat}_
               l n g: {this.props.location.state.post.lng}
            </p>
            <h4>
              posted by: {this.props.location.state.post.user.username}
            </h4>
            <p>
              {this.props.location.state.post.post_content}
            </p>
            <div>
              u p_V o t e s: { ' ' + this.props.location.state.post.up_votes + ' '}
              d o w n_V o t e s: {this.props.location.state.post.up_votes}
            </div>
            <span>
              u s e r_R a t i n g : {this.props.location.state.post.user_rating}
            </span>
            <div>
              u p d a t e d_A t : {this.props.location.state.post.updated_at} 
            </div>
          </div>
        </Segment>
      </Segment>
    );
  }
}

export default withRouter(NewPost);