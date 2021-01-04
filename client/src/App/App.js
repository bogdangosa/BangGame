import React,{ useEffect } from 'react'
import './App.css';
import Login from '../Components/Login/Login'
import Lobby from '../Components/Lobby/Lobby'
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import io from 'socket.io-client'



function App() {

  let socket = io("http://localhost:5000/");

  useEffect(()=>{
    socket.emit('message','New User Connected');

  },[]);


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={()=>(<Login socket={socket}/>)}/>
          <Route path="/Lobby" render={()=>(<Lobby socket={socket}/>)}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
