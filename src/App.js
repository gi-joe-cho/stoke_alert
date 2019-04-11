import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './containers/Navbar/Navbar';
import Home from './containers/Home/Home';
import NewPost from './containers/NewPost/NewPost';
import Profile from './containers/Profile/Profile';
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
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            {/* {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null} */}
            {/* <Redirect from="/" to="/posts" /> */}
            {this.state.signedIn ? <Route path="/profile" exact component={Profile} /> : <Route path="/profile" component={NoLogin}/> }
            {this.state.signedIn ? <Route path="/post/new" exact component={NewPost} /> : <Route path="/post/new" component={NoLogin} /> }
            <Route path="/" exact component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
