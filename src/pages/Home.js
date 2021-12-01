import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PostLists from '../components/PostLists';
import PostAdd from '../components/PostAdd';

import '../assets/App.css';

function Home() {
  return (
    <Routes>
      <Route path='/' element={<PostLists />}/>
      <Route path='/add/' element={<PostAdd state={'add'}/>}/>
      <Route path='/edit/:postId' element={<PostAdd state={'edit'}/>}/>
    </Routes>
  );
}

export default Home;
