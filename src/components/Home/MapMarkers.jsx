import React from 'react';
import { Menu, Popup, Icon, Label } from 'semantic-ui-react';

const MapMarker = ({ opened, onClose, labelClass, mouseEnter, mouseLeave, clicked, date, upVote, downVote, city, text, color }) => (
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
    className='map-marker'
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

export default MapMarker;