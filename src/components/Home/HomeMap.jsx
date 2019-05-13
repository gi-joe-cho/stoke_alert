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
  
  getMapOptions = (maps) => {

    return {
      streetViewControl: true,
      scaleControl: true,
      disableDoubleClickZoom: true,
      mapTypeControl: true,
      mapTypeId: maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
        style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
        mapTypeIds: [
          maps.MapTypeId.ROADMAP,
          maps.MapTypeId.SATELLITE,
          maps.MapTypeId.HYBRID
        ]
      },
      zoomControl: true,
      clickableIcons: false,
      styles:[
        {
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#ebe3cd'
            }
          ]
        },
        {
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#523735'
            }
          ]
        },
        {
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'color': '#f5f1e6'
            }
          ]
        },
        {
          'featureType': 'administrative',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#c9b2a6'
            }
          ]
        },
        {
          'featureType': 'administrative.land_parcel',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#dcd2be'
            }
          ]
        },
        {
          'featureType': 'administrative.land_parcel',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#ae9e90'
            }
          ]
        },
        {
          'featureType': 'landscape.natural',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#dfd2ae'
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#dfd2ae'
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#93817c'
            }
          ]
        },
        {
          'featureType': 'poi.park',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#a5b076'
            }
          ]
        },
        {
          'featureType': 'poi.park',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#447530'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#f5f1e6'
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#fdfcf8'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#f8c967'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#e9bc62'
            }
          ]
        },
        {
          'featureType': 'road.highway.controlled_access',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#e98d58'
            }
          ]
        },
        {
          'featureType': 'road.highway.controlled_access',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#db8555'
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#806b63'
            }
          ]
        },
        {
          'featureType': 'transit.line',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#dfd2ae'
            }
          ]
        },
        {
          'featureType': 'transit.line',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#8f7d77'
            }
          ]
        },
        {
          'featureType': 'transit.line',
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'color': '#ebe3cd'
            }
          ]
        },
        {
          'featureType': 'transit.station',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#dfd2ae'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#b9d3c2'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#92998d'
            }
          ]
        }
      ]
    };
  }
  
  render () {
    return(
      <div id='googleMapReact'>
        {
          !this.props.loading
            ? (
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
                center={this.props.userLocation}
                zoom={this.props.zoom}
                onChange={this.props.changeBounds}
                options={this.getMapOptions}
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
            : window.location.reload
        }
      </div>
    );
  }
}

export default MapHome;