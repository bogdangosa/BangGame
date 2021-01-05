import React,{ useEffect } from 'react'
import './App.css';
import Login from '../Components/Login/Login'
import Lobby from '../Components/Lobby/Lobby'
import Game from '../Components/Game/Game'
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import io from 'socket.io-client'



function App() {
  
  //declar variabila socket si o conectez la server
  let socket = io("http://localhost:5000/");

  useEffect(()=>{
    //Trimit Mesaj la server ca m-am conectat
    socket.emit('message','New User Connected');

  },[]);


  //Creez Rutele Siteului
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={()=>(<Login socket={socket}/>)}/>
          <Route path="/Lobby" render={()=>(<Lobby socket={socket}/>)}/>
          <Route path="/Game" render={()=>(<Game socket={socket}/>)}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
