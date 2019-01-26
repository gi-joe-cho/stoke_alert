import React from 'react';
import { Icon, Button, Popup } from 'semantic-ui-react';

 const SignUpButton = ({ closeConfig }) => (
  <Button onClick={closeConfig} id="login">
    <Popup trigger={<Icon name="user circle" />} content='Sign-in to your account' />
  </Button>
)

export default SignUpButton; 