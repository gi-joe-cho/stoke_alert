import React from 'react';
import SurferPost from './SurferPost'

const SurferPosts = ({ surferPosts })  => (
  <ul>
    {surferPosts.map(s => <SurferPost key={surferPosts} surferPost={s} />)}
  </ul>
);


export default SurferPosts;