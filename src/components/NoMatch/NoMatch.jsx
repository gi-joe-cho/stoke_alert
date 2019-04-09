import React, { Component } from 'react';

class NoMatch extends Component {
	state = {
		tabBarName: localStorage.getItem('username'),
	}

	render() {
		return (
			<div className="wrapper-no-login">
				<h1>4 0 4_P a g e_N o t_F o u n d</h1>
			</div>
		);
	}
}

export default NoMatch;