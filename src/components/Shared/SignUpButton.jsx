import React from 'react';
import { Icon, Button, Popup } from 'semantic-ui-react';

const SignUpButton = ({ closeConfig }) => (
  <Button onClick={closeConfig} id="login">
    <Popup trigger={<Icon name="user circle" />} content='Dont have an account? Sign up for an account' />
  </Button>
);

export default SignUpButton; 