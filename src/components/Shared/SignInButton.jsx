import React from 'react';
import { Icon, Button, Popup } from 'semantic-ui-react';

const SignInButton = ({ closeConfig }) => (
  
  <Button onClick={ closeConfig } className="windows-btn" id="login">
    <span className='window-btn-span-cancel'></span>
    <Popup trigger={<Icon name="sign-in" />} content='Sign-in to your account' />
  </Button>
)

export default SignInButton; 