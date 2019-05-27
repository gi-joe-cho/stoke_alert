import React, { Component } from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import HomeMap from './HomeMap';
import HomeMapList from './HomeMapList';
let popOpen = false;

class Home extends Component {
  state = { 
    loading: true,
    posts: [],
    zoom: 12,
    markerColor:'',
    newBounds: null,
    selectedMarkerId: '',
    selectedPostId: '',
    clickedMarkerId:'',
    clickedPostId:'',
  };
  
  getPosts = async () => {
    if (this.state.newBounds !== null){
      const response = await fetch(`${process.env.REACT_APP_DEV_API_DOMAIN}/posts?min_lat=${this.state.newBounds.se.lat.toString()}&max_lat=${this.state.newBounds.ne.lat.toString()}&min_lng=${this.state.newBounds.sw.lng.toString()}&max_lng=${this.state.newBounds.ne.lng.toString()}`);
      const { posts } = await response.json();
      this.setState({ ...this.state, posts});
    }
  }
    
  componentDidMount = async () => {
    await navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          ...this.state, 
          userLocation: {lat:latitude, lng:longitude},
          loading: false
        });
      },
    );
  }
  
  changeBounds = async (data) => {
    await this.setState({ ...this.state, newBounds: data.bounds});
    this.getPosts();
  }
  
  postMouseEnterHandler = (id) => this.setState({ ...this.state, selectedPostId: id });
  
  postMouseLeaveHandler = () => this.setState({ ...this.state, selectedPostId: ''});
  
  postClickedHandler = (id) => this.setState({ ...this.state, clickedPostId: id, clickedMarkerId: id });
  
  markerSelectedHandler = (id) => this.setState({ ...this.state, selectedMarkerId: id, selectedPostId: id });
  
  markerNotSelectedHandler = () => this.setState({ ...this.state, selectedMarkerId: '', selectedPostId: '' });

  markerClickedHandler = (id) => this.setState({ ...this.state, clickedMarkerId: id });
  
  onCloseHandler = () => this.setState({ ...this.state, selectedMarkerId: '', selectedPostId: '', clickedMarkerId: '', clickedPostId: '' });

  render() {
    const { 
      zoom,
      loading, 
      userLocation, 
      posts, 
      selectedMarkerId, 
      clickedMarkerId, 
      selectedPostId, 
      clickedPostId 
    } = this.state;
    
    return(
      <Segment className="home-ocean-pic">
        <Segment className="home-row" stacked>
          <Segment className="map-container" placeholder raised>
            <HomeMap 
              loading={loading}
              userLocation={userLocation}
              posts={posts}
              selectedMarkerId={selectedMarkerId}
              selectedPostId={selectedPostId}
              clickedMarkerId={clickedMarkerId}
              clickedPostId={clickedPostId}
              onCloseHandler={this.onCloseHandler}
              changeBounds={this.changeBounds}
              markerClickedHandler={this.markerClickedHandler}
              markerNotSelectedHandler={this.markerNotSelectedHandler}
              markerSelectedHandler={this.markerSelectedHandler}
              popOpen={popOpen}
              zoom={zoom}
            />
          </Segment>
          <Segment className="map-list-container" placeholder raised>
            <Segment className='map-list-header'>
              <Icon name='warning sign'/>
              <span>
                {'S t 0 K 3 - A  l  e  R  t_'  + ' '}
              </span>
              <Icon name='warning sign'/>
            </Segment>
            <HomeMapList 
              posts={posts}
              clickedMarkerId={clickedMarkerId}
              clickedPostId={clickedPostId}
              selectedMarkerId={selectedMarkerId}
              selectedPostId={selectedPostId}
              popOpen={popOpen}
              postClickedHandler={this.postClickedHandler}
              postMouseEnterHandler={this.postMouseEnterHandler}
              postMouseLeaveHandler={this.postMouseLeaveHandler}
            />
          </Segment>
        </Segment>
      </Segment>
    );
  }
}

export default withRouter(Home);