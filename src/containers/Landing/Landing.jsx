import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

import TabBar from '../../components/TabBar/TabBar';
import StartMenu from '../../components/StartMenu/StartMenu';

class EditPost extends Component {
  state = {
    tabBarName: localStorage.getItem('username'),
  }
  
  render() {
    return (
      <div className='wrapper-container' >
        <div>
          <TabBar
            tabMessage={`U S E R: ${this.state.tabBarName !== null ? this.state.tabBarName : ''}`}
            name='I N I T_'
          />
          <Segment className='div-welcome'>
            <h2>
              W e l c o m e_T o_
            </h2>
            <h1>S t o k e_A  l  e  R  t_</h1>
            <p>S t 0 K 3 - A  l  e  R  t_</p>
            <p>S t 0 K 3 - A  l  e  R  t_</p>
            <p>S t 0 K 3 - A  l  e  R  t_</p>
            <p>S t 0 K 3 - A  l  e  R  t_</p>
            <div>
              <Link to='/home'>
                <button className="windows-btn-edit">
                  <span className='window-btn-span-cancel'>
                    Initialize
                  </span>
                </button>
              </Link>
              <a href='https://www.ipoopyou.com/'>
                <button className="windows-btn-edit">
                  <span className='window-btn-span-cancel'>
                    Abort
                  </span>
                </button>
              </a>
            </div>
          </Segment>
          <StartMenu />
        </div>
      </div>
    );
  }
}

export default withRouter(EditPost);