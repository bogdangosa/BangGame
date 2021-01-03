import React from 'react'
import './App.css';
import Login from '../Components/Login/Login'
import Lobby from '../Components/Lobby/Lobby'
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'



function App() {


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/Lobby" component={Lobby}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
