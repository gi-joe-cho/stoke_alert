import React, { Component } from 'react'
import { Menu, Button, Icon } from 'semantic-ui-react'

export default class MenuExampleTabularOnTop extends Component {
    state = { activeItem: 'bio' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div className="navbar-container">
                <Menu attached='top' tabular >
                    <Menu.Item className="stoke-bar">
                        S T O K E - A L E R T
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button id="login">
                                <Icon name="question" />
                            </Button>
                            <Button id="sign-out">
                                <Icon name="close" />
                                {/* <p className="sign-out-content">Sign Out</p> */}
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                    
                </Menu>
                <Menu className="file-menu" attached='top' tabular>
                    <Menu.Item 
                        name='Home' 
                        active={activeItem === 'Home'} 
                        onClick={this.handleItemClick} 
                    >
                        <span className="under-line">H</span>
                        <span>ome</span>

                    </Menu.Item> 
                    
                    <Menu.Item 
                        name='New Post'
                        active={activeItem === 'New Post'}
                        onClick={this.handleItemClick}
                    >
                        <span className="under-line">N</span>
                        <span>ew Post</span>
                        
                    </Menu.Item>
                 
                </Menu>
            </div>
        

            
        )
    }
}
