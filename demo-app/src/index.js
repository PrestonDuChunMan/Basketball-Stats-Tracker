import ReactDOM from 'react-dom/client';

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddPlayer from './components/AddPlayer';
import AddGame from './components/AddGame';
import GameStatsRecorder from './pages/GameStatsRecorder';
import AddGameStats from './components/AddGameStats';
import DashBoard from './pages/DashBoard';
import GamePage from './pages/GamePage';
import PlayerPage from './pages/PlayerPage';
import AllPlayers from './pages/AllPlayers';



class App extends React.Component {
  

  
  render() {
    return (
      <>
        <BrowserRouter>
          <div>
            <ul>
              {/* <li>
                <Link to="/">Home</Link>
              </li> */}
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/players">All players </Link>
              </li>
            </ul>
          </div>
          <hr/>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashBoard />} />
            {/* <Route path="/player" element={<AllPlayerPage />} /> */}
            <Route path="/player/:playerId/:playerName" element={<PlayerPage />} />
            <Route path="/game/:gameId/:gameDate/:gameNumber" element={<GamePage/> } />
            <Route path="/game/game_stats" element={<GameStatsRecorder/> } />
            <Route path="/players" element={<AllPlayers/> } />
            <Route path="*" element={<NoMatch />} />

          </Routes>
        </BrowserRouter>

      </>
    );
  }
}



class Home extends React.Component {
  render() {
    return (
      <div>
        <h2 class="ms-2">Home</h2>
        <img class="ms-2" src="home-diagram.png"></img>
      </div>
    );
  }
}

function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No Match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}


const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);
