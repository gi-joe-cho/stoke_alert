import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import TabBar from '../../components/TabBar/TabBar';
import StartMenu from '../../components/StartMenu/StartMenu';
import PostDetailComponent from '../../components/Post/PostDetailComponent';

class PostDetail extends Component {
  state = {
    tabBarName: localStorage.getItem('username'),
  }

  render() {
    return (
      <div className="wrapper-container">
        <Segment className="div-thang" raised>
          <TabBar
            tabMessage={`U S E R: ${this.state.tabBarName !== null ? this.state.tabBarName : ''}`}
            name="P o s t_D e t a i l_"
          />
          <PostDetailComponent />
          <StartMenu />
        </Segment>
      </div>
    );
  }
}

export default PostDetail;