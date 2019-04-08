import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

class Home extends Component {
render() {
	return(
		<Segment className="home-ocean-pic">
			<Segment className="home-row" stacked>
				<Segment className="map-container" placeholder raised>
					<div className="map">
						<p>MAP WILL GO HERE</p>
						<span>S t 0 K 3 - A  l  e  R  t</span>
						<span>S t 0 K 3 - A  l  e  R  t</span>
						<span>S t 0 K 3 - A  l  e  R  t</span>
						<span>S t 0 K 3 - A  l  e  R  t</span>
					</div>
				</Segment>
				<Segment className="map-list-container" placeholder raised>
					<div>
						<p>MAP LIST WILL GO HERE</p>
						<p>S t 0 K 3 - A  l  e  R  t</p>
					</div>
				</Segment>
			</Segment>
		</Segment>
	);
}
};

export default Home;