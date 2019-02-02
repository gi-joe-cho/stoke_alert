import React, { Component } from 'react';
import Navbar from './containers/Navbar/Navbar';
import Home from './containers/Home/Home';

class App extends Component {
  state = {
    textBool: true
  }
  render() {
  const { textBool } = this.state
    return (
      <div>
        <Navbar textBool={textBool} />
        <Home textBool={textBool}/>
      </div>
    );
  }
}

export default App;
