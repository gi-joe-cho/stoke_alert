import React, { Component } from 'react';

class NoLogin extends Component {
	state = {
		tabBarName: localStorage.getItem('username'),
	}

	render() {
		return (
			<div className="wrapper-no-login">
				<h1>4 0 4_L o g i n_I n_D u d e</h1>
			</div>
		);
	}
}

export default NoLogin;
