import React from 'react';
import './App.css';
import Auth from './containers/Auth/Auth';
import PostAuth from './containers/PostAuth/PostAuth';
import Explore from './containers/Explore/ExploreHome';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Auth} />
        <Route path="/enter" component={PostAuth} />
        <Route path="/explore" component={Explore} />
      </BrowserRouter>
    </div>
  );
}

export default App;
