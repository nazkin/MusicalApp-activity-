import React from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import Homepage from './components/Homepage/Homepage';
import AccountManager from './components/AccountManager/AccountManager';
import TalentList from './components/TalentList/TalentList';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Auth} />
        <Route path="/home" component = {Homepage}/>
        <Route path="/account" component = {AccountManager} />
        <Route path="/talents" component = {TalentList} />
      </BrowserRouter>
    </div>
  );
}

export default App;
