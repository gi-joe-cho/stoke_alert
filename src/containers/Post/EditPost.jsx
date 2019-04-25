import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import TabBar from '../../components/TabBar/TabBar';
import StartMenu from '../../components/StartMenu/StartMenu';
import EditPostComponent from '../../components/Post/EditPostComponent';

class EditPost extends Component {
  state = {
    tabBarName: localStorage.getItem('username'),
  }

  render() {
    return (
      <div className="wrapper-container">
        <Segment className="div-thang" raised>
          <TabBar
            tabMessage={`U S E R: ${this.state.tabBarName !== null ? this.state.tabBarName : ''}`}
            name="E d i t_P o s t_"
          />
          <EditPostComponent />
          <StartMenu />
        </Segment>
      </div>
    );
  }
}

export default EditPost;