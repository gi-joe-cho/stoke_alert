import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import MapMarker from './MapMarkers';
import CurrentDate from '../../utils/currentDate';
import { getMapOptions } from '../../utils/getMapOptions';

class MapHome extends Component {
  markerColorHandler = (post) => {
    switch (post.user_rating) {
    case 'Gnarly':
      return 'red';
    case 'Good':
      return 'orange';
    case 'Fair':
      return 'yellow';
    case 'Poor':
      return 'teal';
    case 'Flat':
      return 'grey';
    default:
      'grey';
    }
  };
  
  reloadPage () {
    window.location.reload;
  }
  
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

  render() {
    return (
      <div id='google-map-react'>
        {
          !this.props.loading
            ? (
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
                center={this.props.userLocation}
                zoom={this.props.zoom}
                onChange={this.props.changeBounds}
                options={getMapOptions}
              >
                <MapMarker
                  lat={this.props.userLocation.lat}
                  lng={this.props.userLocation.lng}
                  date={<CurrentDate />}
                  text='Current Location'
                  city='Current Location'
                  color={'purple'}
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
            : this.reloadPage()
        }
      </div>
    );
  }
}

export default MapHome;
