import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';
import TabBar from '../../components/TabBar/TabBar';
import StartMenu from '../../components/StartMenu/StartMenu';
import NewPostComponent from '../../components/NewPost/NewPostComponent';

class NewPost extends Component {
  state = {
    tabBarName: localStorage.getItem('username'),
  }

  render() {
    return (
      <div className="wrapper-container">
        <Segment className="div-thang" raised>
          <TabBar
            tabMessage={`U S E R: ${this.state.tabBarName !== null ? this.state.tabBarName : ''}`}
            name="N e w_P o s t_"
          />
          <NewPostComponent />
          <StartMenu />
        </Segment>
      </div>
    );
  }
}

export default NewPost;