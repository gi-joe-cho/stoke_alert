import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import TabBar from '../../components/TabBar/TabBar';
import StartMenu from '../../components/StartMenu/StartMenu';
import HomeComponent from '../../components/Home/HomeComponent';
class Home extends Component {
  state = {
    tabBarName: localStorage.getItem('username'),
  }
	
  render() {
    return (
      <div className="wrapper-container">
        <Segment className="div-thang" raised>
          <TabBar
            tabMessage={`U S E R: ${this.state.tabBarName !== null ? this.state.tabBarName : ''}` }
            name = 'M a p_'
          />
          <HomeComponent />
          <StartMenu />
        </Segment>
      </div>
    );
  }
}

export default Home;