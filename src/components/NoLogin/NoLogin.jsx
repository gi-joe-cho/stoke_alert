import React, { Component } from 'react';

// import { Segment } from 'semantic-ui-react';
// import TabBar from '../../components/TabBar/TabBar';
// import StartMenu from '../../components/StartMenu/StartMenu';
// import ProfileComponent from '../../components/Profile/ProfileComponent';
class NoLogin extends Component {
	state = {
		tabBarName: localStorage.getItem('username'),
	}

	render() {
		return (
			<div className="wrapper-no-login">
				<h1>4 0 4_L o g i n_I n_D u d e</h1>
				{/* <Segment className="div-thang" raised>
					<TabBar
						tabMessage={`U S E R: ${this.state.tabBarName !== null ? this.state.tabBarName : ''}`}
						name="N o_ M a t c h_"
					/>

					<StartMenu />
				</Segment> */}
			</div>
		);
	}
}

export default NoLogin;
