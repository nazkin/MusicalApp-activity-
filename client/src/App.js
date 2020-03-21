import React from 'react';
import './App.css';
import Auth from './containers/Auth/Auth';
import PostAuth from './containers/PostAuth/PostAuth';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Auth} />
        <Route path="/enter" component={PostAuth} />
      </BrowserRouter>
    </div>
  );
}

export default App;
