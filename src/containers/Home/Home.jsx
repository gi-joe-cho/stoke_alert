import React, { Component } from 'react';
import { Segment, Button, Dropdown, Icon } from 'semantic-ui-react';
import TabBar from '../../components/TabBar/TabBar';

class Home extends Component {
    state = {
        tabBarName: localStorage.getItem("username"),
    }
    tokenMatch = () => {
        const { validations } = this.state;
        let tokenStorage = localStorage.getItem("token");
        if (validations.token != null && validations.token === tokenStorage) {
            this.changeValidation('signedIn', true);
        } else {
            this.changeValidation('signedIn', false);
        }
    }
    render() {
        return (
            <div className="wrapper-container">
                <Segment className="div-thang" raised>
                    {this.state.tabBarName != null ? <TabBar tabMessage={'U S E R: ' + this.state.tabBarName } name="Map" /> : <TabBar tabMessage={'U S E R: '  } name="Map" /> }
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
                        <Dropdown text="Start" upward icon="chevron up" floating labeled button id="right-arrow" className="icon" > 
                            <Dropdown.Menu>
                                <Dropdown.Header icon='hand peace outline' content='Stoke_Alert_Menu_' />
                                <Dropdown.Item>Important</Dropdown.Item>
                                <Dropdown.Item>Announcement</Dropdown.Item>
                                <Dropdown.Item icon='phone' content='Contact' subheader='Stoke_Alert_ Facebook page' />
                                <Dropdown.Item icon='question' text='About' />
                            </Dropdown.Menu>
                        </Dropdown>

                        <Button className="start-menu-icon" icon>
                            <Icon className="fb-icon"  name='facebook official' size='large' />
                        </Button>
                        <Button onClick={this.getUser} className="start-menu-icon-ig" icon>
                            <span className="ig-icon">
                                <Icon name='instagram' size='large'/>
                            </span>
                        </Button>
                    </div>     
                </Segment>   
            </div>
        )
    }
}

export default Home;