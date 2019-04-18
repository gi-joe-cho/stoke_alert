import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
class HomeMapList extends Component {
  render(){
    return(
      <div>
        {
          this.props.posts !== undefined
            ? (
              this.props.posts.map(post => {
                let postColor = '';
                let postClass = 'map-list-item';
                if (post.user_rating === 'Gnarly') {
                  postColor = 'red';
                } else if (post.user_rating === 'Good') {
                  postColor = 'orange';
                } else if (post.user_rating === 'Fair') {
                  postColor = 'yellow';
                } else if (post.user_rating === 'Poor') {
                  postColor = 'teal';
                } else if (post.user_rating === 'Flat') {
                  postColor = 'grey';
                }
                if (this.props.selectedMarkerId === post.id || this.props.clickedMarkerId === post.id) {
                  postClass = 'map-list-item-active';
                }
                return (
                  <div
                    className={postClass}
                    onMouseEnter={() => this.props.postMouseEnterHandler(post.id)}
                    onMouseLeave={() => this.props.postMouseLeaveHandler(post.id)}
                    onClick={() => this.props.postClickedHandler(post.id)}
                    key={post.id}
                  >
                    <h4 className={postColor}>
                      <Icon name='folder' />{post.city}
                    </h4>
                    <span className='marker-span'>
                      <strong>Posted: </strong>
                      {post.created_at.substring(0, 10)}
                    </span>
                    <p>
                      {post.post_content.substring(0, 65) + '...' }
                      <Link to={'/post/' + post.id}>Read More</Link>
                    </p>
                  </div>
                );
              })
            )
            : null
        }
      </div>
    );
  }
}

export default HomeMapList;