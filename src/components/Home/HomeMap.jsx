import React, { Component } from 'react';
import { Menu, Popup, Icon, Label } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const style = {
  borderRadius: 0,
  border: '1px solid white',
  opacity: 0.7,
  backgroundColor: 'grey',
  color: 'white'
};

const AnyReactComponent = ({ opened, onClose, labelClass, mouseEnter, mouseLeave, clicked, date, upVote, downVote, city, text, color }) => (
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
        <Icon name='thumbs up' />
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

class MapHome extends Component {
  render(){
    return(
      <div style={{ height: '100%', width: '100%' }}>
        {
          !this.props.loading
            ? (
              <GoogleMapReact
                // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                defaultCenter={this.props.userLocation}
                defaultZoom={this.props.zoom}
                onChange={this.props.changeBounds}
              >
                <AnyReactComponent
                  lat={this.props.userLocation.lat}
                  lng={this.props.userLocation.lng}
                  date={dateToday}
                  text="Current Location"
                  city='Current Location'
                />
                {
                  this.props.posts !== undefined
                    ? (
                      this.props.posts.map(post => {
                        let markerColor = '';
                        let markerClass = '';
                        let popOpen = false;
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
                        if (this.props.selectedPostId === post.id || this.props.clickedPostId === post.id) {
                          markerClass = 'map-marker-active';
                        }
                        if (this.props.clickedPostId === post.id || this.props.clickedMarkerId === post.id) {
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
            : null
        }
      </div>
    );
  }
}

export default MapHome;