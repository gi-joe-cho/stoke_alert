import React, { Component } from 'react';
import Navbar from './containers/Navbar/Navbar';
import Home from './containers/Home/Home';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Home />
      </div>
    );
  }
}

export default App;
