import React, { Component } from 'react';

const AsyncComponent = (importComponent) => {
	return class extends Component {
		state = {
			component: null
		}

		componentDidMount() {
			importComponent()
				.then(cmp => {
					this.setState({ component: cmp.default });
				});
		}

		render() {
			const Component = this.state.component;

			return Component ? <C {...this.props} /> : null;
		}
	};
};

export default AsyncComponent;