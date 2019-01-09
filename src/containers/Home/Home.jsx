import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
// import MapContainer from '../../components/Home/MapContainer';
// import SurferPosts from '../../components/Home/SurferPosts';
class Home extends Component {
    state = {
        coordinates: {
            latitude: null,
            longitude: null,
        },
        surferPosts: [1,2,3,4,5,6,7,8]
    }

    // componentDidMount() {
    //     this.requestPosts();
    // }

    // requestPosts = async () => {
    //     const posts = await getPosts();
    //     this.setState({ surferPosts: posts });
    // }

    render() {
        const { coordinates, surferPosts } = this.state;
        return (
            <div>
                {/* <MapContainer coordinates={coordinates} /> */}
                {/* <SurferPosts surferPosts={ surferPosts } /> */}
                
                
                    <div className="div-thang">
                        
                        <img class="ocean-pic" src="https://images.pexels.com/photos/7321/sea-water-ocean-horizon.jpg?auto=compress&cs=tinysrgb&h=750&w=1260"/>

                        {/* <div className="text-div">
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                            <p>S t 0 K 3 - A  l  e  R  t</p>
                    </div> */}
                </div>
               

            </div>
        )
    }
}


export default Home;