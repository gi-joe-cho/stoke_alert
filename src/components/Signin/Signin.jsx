import React from 'react';
import { Form, Modal, Popup, Icon } from 'semantic-ui-react';

import SignInButton from '../Shared/SignInButton'
import TabBar from '../TabBar/TabBar';

const ModalSignIn = (
  {
    submittedName,
    submittedEmail,
    handleChange,
    handleSubmit,
    signInSubmit,
    validations,
    upClose,
    inModalOpen,
    inCloseConfig,
    signBothClose,
    usernameSignIn='',
    passwordSignIn = ''
  }
) => (
    <Modal
      trigger={<SignInButton closeConfig={inCloseConfig} />}
      size='tiny'
      open={inModalOpen}
      onClose={signBothClose}
      closeOnDimmerClick={true}
    >
      <Modal.Header><TabBar tabMessage={'S i g n_I n . e x e'} closeModal={signBothClose} /></Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Group >
            <Form.Input label='Username' placeholder='username' width='6' name='usernameSignIn' value={usernameSignIn} onChange={handleChange} error={!validations.usernameSignIn} />
          </Form.Group>
          <Form.Group >
            <Form.Input label='Password' placeholder='password' type='Password' width='6' name='passwordSignIn' value={passwordSignIn} onChange={handleChange} error={!validations.passwordSignIn} />
          </Form.Group>
          <div className="modal-ocean">
            <div className="color-div">
              <strong>onChange:</strong>
              <pre>{JSON.stringify({ usernameSignIn }, null, 2)}</pre>
              <strong>onSubmit:</strong>
              <pre>{JSON.stringify({ submittedName, submittedEmail }, null, 2)}</pre>
            </div>
          </div>
          <input type="submit" id="submit-form" className="hidden" />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <label className="windows-btn-sign" onClick={upClose} ><span className='window-btn-span-sign'>Sign Up</span><Popup trigger={<Icon name="user circle" />} content='Sign up for an account' /></label>
        <label className="windows-btn" htmlFor="submit-form" onClick={signInSubmit} tabIndex="0"><span className='window-btn-span-ok'>Sign In</span></label>
        <label onClick={signBothClose} className="windows-btn"><span className='window-btn-span-cancel'>Cancel</span></label>
      </Modal.Actions>
    </Modal>
  )

export default ModalSignIn