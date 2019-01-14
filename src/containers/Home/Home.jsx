import React, { Component } from 'react';
import { Segment, Button, Dropdown, Header, Icon } from 'semantic-ui-react';
import TabBar from '../../components/TabBar/TabBar';

const options = [
    { key: 1, text: 'One', value: 1 },
    { key: 2, text: 'Two', value: 2 },
    { key: 3, text: 'About', value: 3 },
]

class Home extends Component {
    state = {}

    render() {
        return (
            <div className="wrapper-container">
                <Segment className="div-thang" raised>
                    <TabBar name="Map" />
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

                    <div className="start-menu">
                        <Dropdown text="Start" upward icon="chevron up" floating labeled button selection options={options} id="right-arrow" className="icon" > 
                            <Dropdown.Menu>
                                <Dropdown.Header fluid icon='hand peace outline' content='Stoke_Alert_Menu_' />
                                <Dropdown.Item>Important</Dropdown.Item>
                                <Dropdown.Item>Announcement</Dropdown.Item>
                                <Dropdown.Item icon='facebook official' content='Facebook' subheader='Stoke_Alert_ Facebook page' />
                                <Dropdown.Item icon='facebook official' content='Facebook' subheader='Stoke_Alert_ Facebook page' />
                                <Dropdown.Item icon='question' text='About' />
                                <Header icon='facebook official' content='Facebook' subheader='Stoke_Alert_ Facebook page'/>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Button className="start-menu-icon" icon>
                            <Icon  name='facebook official' size='large' />
                        </Button>
                        <Button className="start-menu-icon" icon>
                            <Icon name='instagram' size='large'/>
                        </Button>
                        <Button className="start-menu-icon" icon>
                            <Icon name='text width' size='large' />
                        </Button>
                    </div>     

                </Segment>   
            </div>
        )
    }
}

export default Home;