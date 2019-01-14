import React, { Component } from 'react';


class TabBar extends Component {
  render() {
    return(
      <div className="nav-bar">
        <div className="title-bar">
          <ul>
            <li> <span>S t o k e_A l e r t_</span></li>
            <button className="btn-title-bar">x</button>
          </ul>
        </div>
        <div className="menu-bar" >
          <ul>
            <li><a className="back-tab" href="news.asp">Back</a></li>
            <li><a href="contact.asp">Contact</a></li>
            <li><a href="about.asp">Profile</a></li>
          </ul>
        </div>
      </div>
    ); 
  }
}

export default TabBar;


