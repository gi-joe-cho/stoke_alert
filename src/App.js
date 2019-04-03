import React, { Component } from 'react';
import Navbar from './containers/Navbar/Navbar';
import Home from './containers/Home/Home';

import { BrowserRouter } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Navbar />
					<Home />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
