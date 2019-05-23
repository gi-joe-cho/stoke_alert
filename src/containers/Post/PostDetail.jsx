import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import TabBar from '../../components/TabBar/TabBar';
import StartMenu from '../../components/StartMenu/StartMenu';
import PostDetailComponent from '../../components/Post/PostDetailComponent';
import NoMatch from '../../components/NoMatch/NoMatch';

class PostDetail extends Component {
  state = {
    tabBarName: localStorage.getItem('username'),
    loading: false
  }
  
  checkPost = async () => {
    const response = await fetch(`${process.env.REACT_APP_DEV_API_DOMAIN}/posts/${this.props.match.params.post_id}`);
    if (response.status !== 404) {
      this.setState({ loading: true });
    }
    else if (response.status === 404) {
      console.log('page not found');
      this.setState({ loading: false });
    }
  }

  render() {
    this.checkPost();
    return (
      <div>
        {
          this.state.loading
            ? (
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
            )
            : <NoMatch /> 
        }
      </div>
    );
  }
}

export default PostDetail;