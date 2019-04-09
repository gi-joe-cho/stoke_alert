import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import TabBar from '../../components/TabBar/TabBar';
import StartMenu from '../../components/StartMenu/StartMenu';

class NoLogin extends Component {
	state = {
		tabBarName: localStorage.getItem('username'),
	}

	render() {
		return (
			<div className="wrapper-container">
				<Segment className="div-thang" raised>
					<TabBar
						tabMessage={`U S E R: ${this.state.tabBarName !== null ? this.state.tabBarName : ''}`}
						name='M a p_'
					/>
					<Segment className="no-login-pic">
						<Segment className="home-row" stacked>
							<h1>4 4 0_L o g i n_I n_D u d e</h1>
						</Segment>
					</Segment>
					<StartMenu />
				</Segment>
			</div>
		);
	}
}

export default NoLogin;
