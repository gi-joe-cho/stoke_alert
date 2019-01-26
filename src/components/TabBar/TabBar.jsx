import React from 'react';
import { Icon, Button, Popup } from 'semantic-ui-react';

const TabBar = ({ closeModal}) => (
      <div className="nav-bar">
        <div className="title-bar">
          <ul>
            <li> <span>S t o k e_A l e r t_</span></li>
            <Button onClick={closeModal} id="close-window">
              <Popup trigger={<Icon name="close" />} content='Close Window' />
            </Button>
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
)
export default TabBar;


