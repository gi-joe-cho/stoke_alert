import React from 'react';

import { Button, Dropdown, Icon } from 'semantic-ui-react';

const startMenu = () => (
	<div className="start-menu">
		<Dropdown
			upward
			labeled
			floating
			button
			text="Start"
			icon="chevron up"
			id="right-arrow"
			className="icon"
		>
			<Dropdown.Menu>
				<Dropdown.Header icon='hand peace outline' content='Stoke_Alert_Menu_' />
				<Dropdown.Item>Important</Dropdown.Item>
				<Dropdown.Item>Announcement</Dropdown.Item>
				<Dropdown.Item icon='phone' content='Contact' subheader='Stoke_Alert_ Facebook page' />
				<Dropdown.Item icon='question' text='About' />
			</Dropdown.Menu>
		</Dropdown>
		<Button className="start-menu-icon" icon>
			<Icon className="fb-icon" name='facebook official' size='large' />
		</Button>
		<Button className="start-menu-icon-ig" icon>
			<span className="ig-icon">
				<Icon name='instagram' size='large' />
			</span>
		</Button>
	</div>
);

export default startMenu;