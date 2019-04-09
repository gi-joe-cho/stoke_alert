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
						tabMessage={`U S E R: ${this.state.tabBarName !== null ? this.state.tabBarName : 'L O G I N_N o t_V e r i f i e d'}`}
						name='E r r o r_'
					/>
					<Segment className="no-login-pic">
						<Segment className="home-row" stacked>
							<h1>4 4 0 : L o g i n_T o_P r o c e e d</h1>
						</Segment>
					</Segment>
					<StartMenu />
				</Segment>
			</div>
		);
	}
}

export default NoLogin;
