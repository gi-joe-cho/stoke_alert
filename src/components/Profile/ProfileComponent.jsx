import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
class Profile extends Component {
	render() {
		return (
			<Segment className="profile-ocean-pic">
				<Segment className="home-row" stacked>
					<div>P R O F I L E</div>
				</Segment>
			</Segment>
		);
	}
}

export default Profile;