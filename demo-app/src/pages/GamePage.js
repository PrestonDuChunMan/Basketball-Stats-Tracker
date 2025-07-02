import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const GamePage = () => {
  const { gameId, gameDate, gameNumber } = useParams();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGameDetail();
  }, [gameId, gameDate, gameNumber]);

  const fetchGameDetail = async () => {
    try {
      const response = await fetch(`http://localhost:8080/game/${gameId}/${gameDate}/${gameNumber}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setGames(data);
      setLoading(false);
    } catch (error) {
      console.log("fetch error: " + error);
      setLoading(false);
      setError(error.message);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const uniqueScores = games.reduce((acc, game) => {
    const score = `Team A (${game.gameId.scoreA} - ${game.gameId.scoreB}) Team B`;
    const date = `${game.gameId.date} ${game.gameId.gameNumber}`
    if (!acc.includes(score)) {
      acc.push(score);
      acc.push(date)
    }
    return acc;
  }, []);
  const calculatePercentage = (made, attempted) => {
    return attempted > 0 ? `${((made / attempted) * 100).toFixed(1)}%` : '0.0%';
  };

  return (
    <div className='container'>
      <h2 className="">Game detail</h2>

      <div className="">{uniqueScores.map((score, index) => (
        <div key={index}>{score}</div>
      ))} </div>

      <div class="table-responsive">
        <table class="table table-hover table-bordered">
          <thead class="table-light">
            <tr>
              <th scope="col">Players</th>
              <th scope="col">PTS</th>
              <th scope="col">FGM</th>
              <th scope="col">FGA</th>
              <th scope="col">FG%</th>
              <th scope="col">3PM</th>
              <th scope="col">3PA</th>
              <th scope="col">3P%</th>
              <th scope="col">FTM</th>
              <th scope="col">FTA</th>
              <th scope="col">FT%</th>
              <th scope="col">REB</th>
              <th scope="col">AST</th>
              <th scope="col">STL</th>
              <th scope="col">BLK</th>
              <th scope="col">TO</th>
            </tr>
          </thead>

          <tbody>
            {games.map(game => (
              <tr key={game.id}>
                <th scope="row"><a href={`/player/${game.playerId.id}/${game.playerId.name}`} style={{ textDecoration: 'none' }}>{game.playerId.name}</a></th>
                <td>{game.points}</td>
                <td>{game.fieldGoalMade}</td>
                <td>{game.fieldGoalAttempted}</td>
                <td>{calculatePercentage(game.fieldGoalMade, game.fieldGoalAttempted)}</td>
                <td>{game.threePointerMade}</td>
                <td>{game.threePointerAttempted}</td>
                <td>{calculatePercentage(game.threePointerMade, game.threePointerAttempted)}</td>
                <td>{game.freeThrowMade}</td>
                <td>{game.freeThrowAttempted}</td>
                <td>{calculatePercentage(game.freeThrowMade, game.freeThrowAttempted)}</td>
                <td>{game.rebounds}</td>
                <td>{game.assists}</td>
                <td>{game.steal}</td>
                <td>{game.block}</td>
                <td>{game.turnover}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GamePage;