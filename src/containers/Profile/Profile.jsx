import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';
import TabBar from '../../components/TabBar/TabBar';
import StartMenu from '../../components/StartMenu/StartMenu';
import ProfileComponent from '../../components/Profile/ProfileComponent';

class Profile extends Component {
  state = {
    tabBarName: localStorage.getItem('username'),
  }

  render() {
    return (
      <div className="wrapper-container">
        <Segment className="div-thang" raised>
          <TabBar
            tabMessage={`U S E R: ${this.state.tabBarName !== null ? this.state.tabBarName : ''}`}
            name="P r o f i l e_"
          />
          <ProfileComponent />
          <StartMenu />
        </Segment>
      </div>
    );
  }
}

export default Profile;