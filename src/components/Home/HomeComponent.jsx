import React, { Component } from 'react';
import { Menu, Segment, Popup, Icon, Label } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';
import { withRouter} from 'react-router-dom';

const style = {
  borderRadius: 0,
  border: '1px solid white',
  opacity : 0.7,
  backgroundColor: 'grey',
  color: 'white'
};

const AnyReactComponent = ({ onClose, opened, labelClass, mouseEnter, mouseLeave, clicked, date, upVote, downVote, city, text, color }) => (
  <Popup
    trigger={(
      <Label 
        as='a'
        className={labelClass}
        onClick={clicked}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        color={color}
        pointing='below'
        circular 
      >
        {text}
      </Label>
    )}
    style={style}
    size='mini'
    on='click'
    open={opened}
    onClose={onClose}
  >
    <Menu.Header>
      {city}
    </Menu.Header>
    <span>Posted: {date}</span>
    <Menu size='tiny'>
      <Menu.Item as='a'>
        <Icon name='thumbs up'/>
        <Label color='teal' floating>
          {upVote}
        </Label>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='thumbs down' />
        <Label color='red' floating>
          {downVote}
        </Label>
      </Menu.Item>
    </Menu>
  </Popup>
);

let today = new Date();
let dateToday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

class Home extends Component {
  state = { 
    userLocation: { lat: '', lng: '' },
    loading: false,
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
      const response = await fetch('http://localhost:8081/api/posts?min_lat=' + this.state.newBounds.se.lat.toString() + '&max_lat=' + this.state.newBounds.ne.lat.toString() + '&min_lng=' + this.state.newBounds.sw.lng.toString() + '&max_lng=' + this.state.newBounds.ne.lng.toString());
      const { posts } = await response.json();
      this.setState({posts})
    } else{
      
    }
  }
    
  componentWillMount = async () => {
      await navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          
          this.setState({
            userLocation: {lat:latitude, lng:longitude},
            loading: false
          });
        },
        () => {
          this.setState({ loading: false });
        }
      );
  }
  
  changeBounds = async (props) => {
    await this.setState({newBounds: props.bounds})
    this.getPosts();
  }
  
  postMouseEnterHandler = (id) => {this.setState({ selectedPostId: id })}
  
  postMouseLeaveHandler () {this.setState({ selectedPostId: ''})}
  
  postClickedHandler = (id) => {
    // this.props.history.push('/post/' + id);
    this.setState({ clickedPostId: id });
    // this.setState({ clickedMarkerId: id });
    
  }
  
  markerSelectedHandler = (id) => {
    this.setState({ selectedMarkerId: id});
    this.setState({ selectedPostId: id });
  }
  
  markerNotSelectedHandler() {
    this.setState({ selectedMarkerId: ''});
    this.setState({ selectedPostId: '' });
  }
  
  markerClickedHandler = (id) => {
    this.setState({ clickedMarkerId: id });
  }

    
  render() {
    const { loading, userLocation, posts, selectedMarkerId, clickedMarkerId, selectedPostId, clickedPostId } = this.state;
    let popOpen = false;
    return(
      <Segment className="home-ocean-pic">
        <Segment className="home-row" stacked>
          <Segment className="map-container" placeholder raised>
              <div style={{ height: '100%', width: '100%' }}>
              {
                !loading
                  ? (
                    <GoogleMapReact
                      // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                      defaultCenter={userLocation}
                      defaultZoom={this.state.zoom}
                      onChange={this.changeBounds}
                    >
                      <AnyReactComponent
                        lat={userLocation.lat}
                        lng={userLocation.lng}
                        date={dateToday}
                        text="Current Location"
                        city='Current Location'
                      />
                      {
                        posts !== undefined
                          ? (
                            posts.map(post => {
                              let markerColor='';
                              let markerClass = '';
                              if(post.user_rating === 'Gnarly') {
                                markerColor = 'red' 
                              } else if (post.user_rating === 'Good') {
                                  markerColor ='orange'
                              } else if (post.user_rating === 'Fair') {
                                  markerColor ='yellow'
                              } else if (post.user_rating === 'Poor') {
                                  markerColor ='teal'
                              } else if (post.user_rating === 'Flat') {
                                  markerColor ='grey'
                              }
                              if (selectedPostId === post.id || clickedPostId === post.id) {
                                markerClass = 'map-marker-active'
                              }
                              if (clickedPostId === post.id || clickedMarkerId === post.id ){
                                popOpen = true;
                              } else {
                                popOpen = false;
                              }
                              return (
                              <AnyReactComponent
                                labelClass={markerClass}
                                key={post.id}
                                lat={post.lat}
                                lng={post.lng}
                                text={post.user_rating}
                                city={post.city}
                                color={markerColor}
                                upVote={post.up_votes}
                                downVote={post.down_votes}
                                date={post.created_at.substring(0, 10)}
                                opened={popOpen}
                                onClose={() => {
                                  this.setState({selectedMarkerId: ''});
                                  this.setState({selectedPostId: ''});
                                  this.setState({clickedMarkerId: ''});
                                  this.setState({clickedPostId: ''});
                                  popOpen = false;
                                }}
                                clicked={() => this.markerClickedHandler(post.id)}
                                mouseEnter={() => this.markerSelectedHandler(post.id)}
                                mouseLeave={() => this.markerNotSelectedHandler(post.id)}
                              />
                              )
                            })
                          )
                          : null
                      }
                    </GoogleMapReact>
                  )
                  : null
              }
              </div>
          </Segment>
          <Segment className="map-list-container" placeholder raised>
              <Segment className='map-list-header'>
                <Icon name='warning sign'/>
                <span>
                  {'S t 0 K 3 - A  l  e  R  t_'  + ' '}
                </span>
                <Icon name='warning sign'/>
              </Segment>
              {
                posts !== undefined
                  ? (
                    posts.map(post => {
                      let postColor = '';
                      let postClass = 'map-list-item'
                      if (post.user_rating === 'Gnarly') {
                        postColor = 'red'
                      } else if (post.user_rating === 'Good') {
                        postColor = 'orange'
                      } else if (post.user_rating === 'Fair') {
                        postColor = 'yellow'
                      } else if (post.user_rating === 'Poor') {
                        postColor = 'teal'
                      } else if (post.user_rating === 'Flat') {
                        postColor = 'grey'
                      }
                      if (selectedMarkerId === post.id || clickedMarkerId === post.id ){
                        postClass = 'map-list-item-active'
                      }
                      return (
                        <div 
                          className={postClass} 
                          onMouseEnter={() => this.postMouseEnterHandler(post.id)}
                          onMouseLeave={() => this.postMouseLeaveHandler(post.id)}
                          onClick={() => {
                            this.postClickedHandler(post.id);
                            popOpen = false;
                          }}
                          key={post.id}
                        >
                          <h4 className={postColor}>
                            <Icon name='folder' />{post.city}
                          </h4>
                          <span className='marker-span'>
                            <strong>Posted: </strong>
                            {post.created_at.substring(0, 10)}
                          </span>
                          <p>
                            {post.post_content.substring(0, 65) + '...'}
                          </p>
                        </div>
                      )
                    })
                  )
                  : null
              }
          </Segment>
        </Segment>
      </Segment>
    );
  }
};

export default withRouter(Home);