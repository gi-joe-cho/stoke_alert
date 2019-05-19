import React, { Component } from 'react';
import { Segment, Image } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

import MapMarker from '../Home/MapMarkers';

class NewPost extends Component {
  state = {
    zoom:15,
  }
  
  postColorHandler = (post) => {
    let postColor = '';
    if (post.user_rating === 'Gnarly') {
      postColor = 'red';
    } else if (post.user_rating === 'Good') {
      postColor = 'orange';
    } else if (post.user_rating === 'Fair') {
      postColor = 'yellow';
    } else if (post.user_rating === 'Poor') {
      postColor = 'teal';
    } else if (post.user_rating === 'Flat') {
      postColor = 'grey';
    }
    return postColor;
  };
  
  getPost = async () => {
    if (this.state.post === undefined) {
      const response = await fetch(`${process.env.REACT_APP_DEV_API_DOMAIN}/posts/${this.props.match.params.post_id}`);
      const { post } = await response.json();
      this.setState({ post: post, userLocation: { lat: post.lat, lng: post.lng } });
      localStorage.setItem('post_user_Id', this.state.post.user.id);
    } 
  }
  
  render() {
    this.getPost();
    return (
      <Segment className="new-post-ocean-pic">
        {
          this.state.post !== undefined
            ?(
              <Segment className="home-row" stacked>
                <Segment className='post-detail-div'>
                  <h1>
                    P O S T_D E T A I L_
                  </h1>
                  <p>
                    U S E R_S T O K E_R A T I N G: {this.state.post.user_rating}
                  </p>
                  <Image src='https://i.pinimg.com/originals/90/64/a1/9064a16dc937d44f1fedba59074d5fa5.jpg' size='large' wrapped />
                  <h4>
                    p o s t e d_b y: {this.state.post.user.username}
                  </h4>
                  <div className='break-word'>
                    {this.state.post.post_content}
                  </div>
                </Segment>
                <Segment id='post-detail-map-div'>
                  <h3>
                    {`${this.state.post.city}, ${this.state.post.state}`}
                  </h3>
                  <p>
                    l  a  t  : {this.state.post.lat}_
                      l  n  g  : {this.state.post.lng}
                  </p>
                  <div className='google-map-container'>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
                      center={this.state.userLocation}
                      zoom={this.state.zoom}
                    >
                      <MapMarker
                        lat={this.state.post.lat}
                        lng={this.state.post.lng}
                        text={this.state.post.user_rating}
                        city={this.state.post.city}
                        color={this.postColorHandler(this.state.post)}
                        upVote={this.state.post.up_votes}
                        downVote={this.state.post.down_votes}
                        date={this.state.post.created_at.substring(0, 10)}
                      />
                    </GoogleMapReact>
                  </div>
                  <p>
                    u p d a t e d_A t : {this.state.post.updated_at.substring(0, 10)}
                  </p>
                  <div>
                    u p_V o t e s: {this.state.post.up_votes}
                  </div>
                  <div>
                    d o w n_V o t e s: {this.state.post.down_votes}
                  </div>
                  {
                    localStorage.getItem('user_Id') === this.state.post.user.id
                      ? (
                        <Link to={
                          {
                            pathname: '/post/' + this.state.post.id + '/edit',
                            state: {
                              post: this.state.post,
                              color: this.postColorHandler(this.state.post)
                            }
                          }
                        }>
                          <button className="windows-btn-edit">
                            <span className='window-btn-span-cancel'>
                              Edit
                            </span>
                          </button>
                        </Link>
                      )
                      : null
                  }
                </Segment>
              </Segment>
            )
            : null
        }
      </Segment>
    );
  }
}

export default withRouter(NewPost);