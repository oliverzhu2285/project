import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostalLookUp from './pages/PostalLookup';
import Universities from './pages/Universities';
import Header from './components/Header'
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/posts/*' element={<Home />} />
        <Route exact path='/postallookup' element={<PostalLookUp />} />
        <Route exact path='/universities/*' element={<Universities />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
