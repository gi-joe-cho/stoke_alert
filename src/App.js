import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './containers/Navbar/Navbar';
import Home from './containers/Home/Home';
import NewPost from './containers/NewPost/NewPost';
import Profile from './containers/Profile/Profile';
import PostDetail from './containers/Post/PostDetail';
import EditPost from './containers/Post/EditPost';
import NoLogin from './components/NoLogin/NoLogin';
import NoMatch from './components/NoMatch/NoMatch';

class App extends Component {
  state = {
    signedIn: false,
    token: localStorage.getItem('token')
  }
  
  tokenMatch () {
    const { token } = this.state;
    let tokenStorage = localStorage.getItem('token');
    if (token != null && token === tokenStorage) {
      this.setState({signedIn: true});
    } else {
      this.setState({signedIn: false});
    }
  }
	
  componentDidMount() {
    this.tokenMatch();
  }

  render() {
    return (
        <div>
          <Navbar />
          <Switch>
            {this.state.signedIn ? <Route path="/profile" exact component={Profile} /> : <Route path="/profile" component={NoLogin}/> }
            {this.state.signedIn ? <Route path="/post/new" exact component={NewPost} /> : <Route path="/post/new" component={NoLogin} /> }
            {
              localStorage.getItem('user_Id') !== null && localStorage.getItem('user_Id') === localStorage.getItem('post_user_Id')
                ? (
                  <Route path="/post/:post_id/edit" exact component={EditPost} />
                )
                : <Route path="/post/:post_id/edit" component={NoMatch} />
            }
            <Route path="/post/:post_id" exact component={PostDetail} />
            <Route path="/" exact component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </div>
    );
  }
}

export default App;
