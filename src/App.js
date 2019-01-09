import React, { Component } from 'react';
import Navbar from './containers/Navbar/Navbar';
import Home from './containers/Home/Home';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="wrapper-container">
          <Home />
        </div>
      </div>
    );
  }
}

export default App;
