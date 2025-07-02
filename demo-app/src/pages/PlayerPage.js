import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PlayerPage = () => {
    const { playerId, playerName } = useParams();
    const [games, setGames] = useState([]);
    const [averages, setAverages] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPlayerDetail();
        fetchPlayerAverages();
    }, [playerId, playerName]);

    const fetchPlayerAverages = async () => {
        try {
            const response = await fetch(`http://localhost:8080/player/${playerId}/averages`);
            if (!response.ok) throw new Error('Network not ok');
            const data = await response.json();
            setAverages(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchPlayerDetail = async () => {
        try {
            const response = await fetch(`http://localhost:8080/player/${playerId}/${playerName}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setGames(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    const uniquePlayerInfo = {};

    games.forEach(game => {
        const { playerId } = game;
        const key = playerId.id;

        if (!uniquePlayerInfo[key]) {
            uniquePlayerInfo[key] = {
                height: playerId.height,
                weight: playerId.weight,
                age: playerId.age,
                birthdate: playerId.birthdate,
            };
        }
    });

    const playerInfo = Object.values(uniquePlayerInfo)[0] || {};

    if (loading) return <div className="text-center mt-5"><h3>Loading...</h3></div>;
    if (error) return <div className="text-danger text-center mt-5"><h3>Error: {error}</h3></div>;

    return (
        <>
            <section className='player-info' >
                <div class="row">
                    <div class="col-4" id="photo-spot">
                        {/* <img src="public\images\timberwolves-icon.png" style="max-width: 90%;"></img> */}
                    </div>
                    <div class="col-4 mb-4">
                        <small class="text-muted ">Kwai Chung Timberwolves | #KCBA | Guard | </small>
                        <h3 class="display-4 ">{ playerName}</h3>
                    </div>
                
                </div>
                <div className='row p-3' >
                    <div className='col col-lg-1 border-end'>
                    </div>
                    <div className='col col-lg border-end d-flex flex-column align-items-center justify-content-center'>
                        <div className=' '>PPG</div>
                        <div className='fs-5 fw-bold '>{averages.PPG}</div>
                    </div>
                    <div className='col col-lg border-end d-flex flex-column align-items-center justify-content-center'>
                        <div className=''>RPG</div>
                        <div className='fs-5 fw-bold '>{averages.RPG}</div>
                    </div>
                    <div className='col col-lg border-end d-flex flex-column align-items-center justify-content-center'>
                        <div className=''>APG</div>
                        <div className='fs-5 fw-bold '>{averages.APG}</div>
                    </div>
                    <div className='col col-lg border-end'>
                        <ul className='list-group'>
                            <li className='list-group-item'>
                                <div className='fw-bold'>Height</div>
                                <div className='fs-5 fw-bold '>{playerInfo.height} cm</div>
                            </li>
                            <li className='list-group-item'>
                                <div className='fw-bold'>Age</div>
                                <div className='fs-5 fw-bold '>{playerInfo.age}</div>
                            </li>
                        
                        </ul>
                    </div>
                    <div className='col col-lg border-end'>
                        <ul className='list-group'>
                            <li className='list-group-item'>
                                <div className='fw-bold'>Weight</div>
                                <div className='fs-5 fw-bold '>{playerInfo.weight} kg</div>
                            </li>
                            <li className='list-group-item'>
                                <div className='fw-bold'>Birthdate</div>
                                <div className='fs-5 fw-bold '>{playerInfo.birthdate}</div>
                            </li>
                        </ul>
                    </div>
                    <div className='col col-lg-1'>
                    </div>
                </div>
            </section>

            <div className="container mt-5">
                <section className='stats-average'>
                    <div className="mb-4">
                        <h4>Averages Details</h4>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Games Played</th>
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
                                    <tr>
                                        <th scope="row">{averages.GP}</th>
                                        <td>{averages.PPG}</td>
                                        <td>{averages.FGM}</td>
                                        <td>{averages.FGA}</td>
                                        <td>{averages.TotalFGA > 0 ? ((averages.TotalFGM / averages.TotalFGA) * 100).toFixed(1) + '%' : '0%'}</td>
                                        <td>{averages.TPM}</td>
                                        <td>{averages.TPA}</td>
                                        <td>{averages.TotalTPA > 0 ? ((averages.TotalTPM / averages.TotalTPA) * 100).toFixed(1) + '%' : '0%'}</td>
                                        <td>{averages.FTM}</td>
                                        <td>{averages.FTA}</td>
                                        <td>{averages.TotalFTA > 0 ? ((averages.TotalFTM / averages.TotalFTA) * 100).toFixed(1) + '%' : '0%'}</td>
                                        <td>{averages.RPG}</td>
                                        <td>{averages.APG}</td>
                                        <td>{averages.STL}</td>
                                        <td>{averages.BLK}</td>
                                        <td>{averages.TOV}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section className='game-history'>
                    <div>
                        <h4>Game History</h4>
                        <div className="table-responsive">
                            <table className="table table-hover table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Game Date</th>
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
                                            <th scope="row">
                                                <a href={`/game/${game.gameId.id}/${game.gameId.date}/${game.gameId.gameNumber}`} style={{ textDecoration: 'none' }}>
                                                    {game.gameId.date} {game.gameId.gameNumber}
                                                </a>
                                            </th>
                                            <td>{game.points}</td>
                                            <td>{game.fieldGoalMade}</td>
                                            <td>{game.fieldGoalAttempted}</td>
                                            <td>{game.fieldGoalAttempted > 0 ? ((game.fieldGoalMade / game.fieldGoalAttempted) * 100).toFixed(1) + '%' : '0.0%'}</td>
                                            <td>{game.threePointerMade}</td>
                                            <td>{game.threePointerAttempted}</td>
                                            <td>{game.threePointerAttempted > 0 ? ((game.threePointerMade / game.threePointerAttempted) * 100).toFixed(1) + '%' : '0.0%'}</td>
                                            <td>{game.freeThrowMade}</td>
                                            <td>{game.freeThrowAttempted}</td>
                                            <td>{game.freeThrowAttempted > 0 ? ((game.freeThrowMade / game.freeThrowAttempted) * 100).toFixed(1) + '%' : '0.0%'}</td>
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
                </section>
            </div>

        </>
    );
};

export default PlayerPage;