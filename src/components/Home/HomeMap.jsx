import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

import MapMarker from './MapMarkers';
import CurrentDate from '../../utils/currentDate';

class MapHome extends Component {
  markerColorHandler = (post) => {
    let markerColor = '';
    if (post.user_rating === 'Gnarly') {
      markerColor = 'red';
    } else if (post.user_rating === 'Good') {
      markerColor = 'orange';
    } else if (post.user_rating === 'Fair') {
      markerColor = 'yellow';
    } else if (post.user_rating === 'Poor') {
      markerColor = 'teal';
    } else if (post.user_rating === 'Flat') {
      markerColor = 'grey';
    }
    return markerColor;
  };
  
  markerClassHandler = (post) => {
    let markerClass = '';
    if (this.props.selectedPostId === post.id || this.props.clickedMarkerId === post.id || this.props.selectedMarkerId === post.id) {
      markerClass = 'map-marker-active';
    }
    return markerClass;
  };
  
  popUpHandler = (post) => {
    let popOpen = false;
    if (this.props.clickedPostId === post.id || this.props.clickedMarkerId === post.id) {
      popOpen = true;
    } else {
      popOpen = false;
    }
    return popOpen;
  };
  
  render () {
    return(
      <div id='googleMapReact' >
        {
          !this.props.loading
            ? (
              <GoogleMapReact
                // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                defaultCenter={this.props.userLocation}
                defaultZoom={this.props.zoom}
                onChange={this.props.changeBounds}
              >
                <MapMarker
                  lat={this.props.userLocation.lat}
                  lng={this.props.userLocation.lng}
                  date={<CurrentDate />}
                  text="Current Location"
                  city='Current Location'
                />
                {
                  this.props.posts !== undefined
                    ? (
                      this.props.posts.map(post => {
                        return (
                          <MapMarker
                            labelClass={this.markerClassHandler(post)}
                            key={post.id}
                            lat={post.lat}
                            lng={post.lng}
                            text={post.user_rating}
                            city={post.city}
                            color={this.markerColorHandler(post)}
                            upVote={post.up_votes}
                            downVote={post.down_votes}
                            date={post.created_at.substring(0, 10)}
                            opened={this.popUpHandler(post)}
                            onClose={() => {
                              this.props.onCloseHandler();
                            }}
                            clicked={() => {
                              this.props.markerClickedHandler(post.id);
                            }}
                            mouseEnter={() => this.props.markerSelectedHandler(post.id)}
                            mouseLeave={() => this.props.markerNotSelectedHandler(post.id)}
                          />
                        );
                      })
                    )
                    : null
                }
              </GoogleMapReact>
            )
            : window.location.reload
        }
      </div>
    );
  }
}

export default MapHome;