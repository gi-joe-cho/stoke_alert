import React from 'react';
import { Form, Modal, Popup, Icon, Segment, Grid } from 'semantic-ui-react';
import SignInButton from '../Shared/SignInButton';
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
		<Modal.Header>
			<TabBar tabMessage="S i g n_I n . e x e" closeModal={signBothClose} />
		</Modal.Header>
		<Modal.Content>
			<div className="modal-pool">
				<Form onSubmit={handleSubmit}>
					<Segment placeholder className="modal-pool">
						<Grid columns={2} relaxed='very' stackable>
							<Grid.Column>
								<Form.Input 
									icon='user' 
									iconPosition='left' 
									label='Username' 
									placeholder='Username' 
									name='usernameSignIn'
									value={usernameSignIn}
									onChange={handleChange}
									error={!validations.errorSignIn}
								/>
								<Form.Input 
									icon='lock' 
									iconPosition='left' 
									label='Password' 
									type='password' 
									name='passwordSignIn'
									value={passwordSignIn}
									onChange={handleChange}
									error={!validations.errorSignIn} 
								/>
							</Grid.Column>
							<Grid.Column verticalAlign='middle'>
								<div className="color-div">
									<strong>onChange:</strong>
									<pre>{JSON.stringify({ usernameSignIn }, null, 2)}</pre>
									<strong>onSubmit:</strong>
									<pre>{JSON.stringify({ submittedName, submittedEmail }, null, 2)}</pre>
									<input type="submit" id="submit-form" className="hidden" />
								</div>
							</Grid.Column>
						</Grid>
					</Segment>
				</Form>
			</div>
		</Modal.Content>
		<Modal.Actions>
			<label className="windows-btn-sign" onClick={upClose}>
				<span className='window-btn-span-sign'>
					Sign Up
				</span>
				<Popup trigger={<Icon name="user circle" />} content='Sign up for an account' />
			</label>
			<label className="windows-btn" htmlFor="submit-form" onClick={signInSubmit} tabIndex="0">
				<span className='window-btn-span-ok'>
					Sign In
				</span>
			</label>
			<label onClick={signBothClose} className="windows-btn">
				<span className='window-btn-span-cancel'>
					Cancel
				</span>
			</label>
		</Modal.Actions>
	</Modal>
);

export default ModalSignIn;