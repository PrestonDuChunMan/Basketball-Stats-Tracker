import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GameStatsRecorder = () => {
    const location = useLocation();
    const { selectedPlayers, selectedGame, games } = location.state || { selectedPlayers: [], selectedGame: '', games: null };

    const selectedGameData = games;

    const playerNames = { //hardcoded, to be implemented
        1: "DCM",
        4: "Harrison",
        5: "Roger",
        6: "Edgar",
        7: "Brian",
        8: "Simon",
        9: "Ray",
        10: "Nelson"
    };

    const [stats, setStats] = useState(selectedPlayers.map(player => ({
        playerId: { id: player.id },
        gameId: { id: selectedGame },
        belongedTeam: player.team,
        points: 0,
        fieldGoalMade: 0,
        fieldGoalMissed: 0,
        fieldGoalAttempted: 0,
        threePointerMade: 0,
        threePointerMissed: 0,
        threePointerAttempted: 0,
        freeThrowMade: 0,
        freeThrowAttempted: 0,
        freeThrowMissed: 0,
        rebounds: 0,
        assists: 0,
        steal: 0,
        block: 0,
        turnover: 0,
    })));
    const [teamScores, setTeamScores] = useState({ teamA: 0, teamB: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        calculateTeamScores();
    }, [stats]);

    const calculateTeamScores = () => {
        const scores = { teamA: 0, teamB: 0 };
        stats.forEach(stat => {
            scores[stat.belongedTeam] += stat.points;
        });
        setTeamScores(scores);
    };

    const copyStatsToClipboard = () => {
        // Structure the text based on the scores and stats
        const teamAPlayers = stats.filter(player => player.belongedTeam === 'teamA');
        const teamBPlayers = stats.filter(player => player.belongedTeam === 'teamB');

        teamAPlayers.sort((a, b) => b.points - a.points);
        teamBPlayers.sort((a, b) => b.points - a.points);

        const isTeamAScoreHigher = teamScores.teamA > teamScores.teamB;

        const copyText = [`BOX SCORE:`, `Team A (${teamScores.teamA} - ${teamScores.teamB}) Team B`, ''];

        const playersToDisplay = isTeamAScoreHigher ? [...teamAPlayers, ...teamBPlayers] : [...teamBPlayers, ...teamAPlayers];

        playersToDisplay.forEach(player => {
            const { points, fieldGoalMade, fieldGoalAttempted, threePointerMade, threePointerAttempted, freeThrowMade, freeThrowAttempted, rebounds, assists, steal, block, turnover } = player;

            const playerName = playerNames[player.playerId.id];

            copyText.push(`${playerName} (${player.belongedTeam}):`);

            // Points
            let fieldGoalStats = fieldGoalAttempted > 0
                ? `(${fieldGoalMade}/${fieldGoalAttempted} FG)`
                : '';

            let threePointStats = threePointerAttempted > 0
                ? `(${threePointerMade}/${threePointerAttempted} 3P)`
                : '';

            let freeThrowStats = freeThrowAttempted > 0
                ? `(${freeThrowMade}/${freeThrowAttempted} FT)`
                : '';

            copyText.push(`${points} PTS ${fieldGoalStats} ${threePointStats} ${freeThrowStats}`);


            // Non-point stats, only show if they're greater than 0
            if (rebounds > 0) copyText.push(`${rebounds} REB`);
            if (assists > 0) copyText.push(`${assists} AST`);
            if (steal > 0) copyText.push(`${steal} STL`);
            if (block > 0) copyText.push(`${block} BLK`);
            if (turnover > 0) copyText.push(`${turnover} TO`);

            copyText.push(''); // Add a blank line between players
        });

        // Copy to clipboard
        navigator.clipboard.writeText(copyText.join('\n')).then(() => {
            alert('Stats copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    const handleIncrement = (index, field) => {
        setStats(prevStats => {
            const newStats = [...prevStats];
            newStats[index][field] += 1; // Increment by 1

            if (field === 'fieldGoalMade') {
                newStats[index].points += 2; // Assuming 2 points for made FG
            } else if (field === 'threePointerMade') {
                newStats[index].points += 3; // Assuming 3 points for made 3PT
            }

            if (field === 'threePointerMade') {
                newStats[index].fieldGoalMade += 1; // Increment made FG
            }
            if (field === 'threePointerMissed') {
                newStats[index].fieldGoalMissed += 1; // Increment made FG
            }
            if (field === 'fieldGoalMade') {
                newStats[index].threePointerMade = Math.min(newStats[index].threePointerMade, newStats[index].fieldGoalMade); // Ensure valid count
            }
            if (field === 'fieldGoalMissed') {
                newStats[index].threePointerMissed = Math.min(newStats[index].threePointerMissed, newStats[index].fieldGoalMissed); // Ensure valid count
            }
            calculateDerivedStats(newStats[index]);
            calculateTeamScores();
            return newStats;
        });
    };

    const handleDecrement = (index, field) => {
        setStats(prevStats => {
            const newStats = [...prevStats];
            if (newStats[index][field] > 0) {
                newStats[index][field] -= 1; // Decrement but not below 0


                if (field === 'fieldGoalMade') {
                    newStats[index].points -= 2; // Decrement points for made FG
                } else if (field === 'threePointerMade') {
                    newStats[index].points -= 3; // Decrement points for made 3PT
                }

                // Update related fields
                if (field === 'threePointerMade') {
                    newStats[index].fieldGoalMade = Math.max(0, newStats[index].fieldGoalMade - 1); // Decrement made FG
                }
                if (field === 'threePointerMissed') {
                    newStats[index].fieldGoalMissed = Math.max(0, newStats[index].fieldGoalMissed - 1); // Decrement made FG
                }
            }

            calculateDerivedStats(newStats[index]);
            calculateTeamScores();
            return newStats;
        });
    };

    const calculateDerivedStats = (playerStats) => {
        const { fieldGoalMissed, fieldGoalMade, threePointerMade, threePointerMissed, freeThrowMade, freeThrowMissed, fieldGoalAttempted, threePointerAttempted, freeThrowAttempted } = playerStats;

        playerStats.points = fieldGoalMade * 2 + threePointerMade * 1 + freeThrowMade;
        playerStats.fieldGoalAttempted = fieldGoalMade + fieldGoalMissed;
        playerStats.threePointerAttempted = threePointerMade + threePointerMissed;
        playerStats.freeThrowAttempted = freeThrowMade + freeThrowMissed;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting stats:', stats); // For debugging
        alert(stats);

        // Format the stats for submission
        const formattedStats = stats.map(stat => ({
            playerId: { id: stat.playerId.id },
            gameId: { id: selectedGame },
            belongedTeam: stat.belongedTeam,
            points: stat.points,
            fieldGoalMade: stat.fieldGoalMade,
            fieldGoalMissed: stat.fieldGoalMissed,
            fieldGoalAttempted: stat.fieldGoalAttempted,
            threePointerMade: stat.threePointerMade,
            threePointerMissed: stat.threePointerMissed,
            threePointerAttempted: stat.threePointerAttempted,
            freeThrowMade: stat.freeThrowMade,
            freeThrowAttempted: stat.freeThrowAttempted,
            freeThrowMissed: stat.freeThrowMissed,
            rebounds: stat.rebounds,
            assists: stat.assists,
            steal: stat.steel,
            block: stat.block,
            turnover: stat.turnover,
        }));

        try {
            const updateResponse = await fetch(`http://localhost:8080/games/update/${selectedGame}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    scoreA: teamScores.teamA,
                    scoreB: teamScores.teamB,
                }),
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update game scores');
            }

            const updateData = await updateResponse.json();
            alert("Game score updated")
            console.log('Game scores updated successfully:', updateData);
        } catch (error) {
            console.error('Error updating scores:', error);
            // alert("error updating scores")
        }
        try {
            const response = await fetch('http://localhost:8080/games/stats/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedStats),
            });

            const responseText = await response.text(); // Get response as text first
            console.log('Response from server:', responseText); // Log the response

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = JSON.parse(responseText); // Parse the response text as JSON
            alert('Stats submitted successfully!');
            console.log(data);

        } catch (error) {
            console.error('Error submitting stats:', error);
            alert('E.submitted!');
            navigate('../dashboard');
        }
    };

    const cols = Math.max(2, Math.ceil(12 / selectedPlayers.length));


    return (
        <div className="containerXX mt-5 ">
            <h4 className='d-flex justify-content-center'>Team A ({teamScores.teamA} - {teamScores.teamB}) Team B</h4>
            <h4 className='ms-4'>Game ID: {selectedGame} | Game Number: {selectedGameData?.gameNumber} | Date: {selectedGameData?.date}</h4>
            <div className="row ms-2 me-2">
                {selectedPlayers.map((player, index) => (
                    <div key={player.id} className={`col-${cols} mb-3`}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {/* Player ID: {player.id} | */}
                                    <div className='d-flex justify-content-center'>{playerNames[player.id]}</div>
                                    <div className='text-center'>({player.team})</div>
                                </h5>



                                {/* Points */}
                                <div className="mb-0">
                                    <label className="form-label">Points: {stats[index].points}</label>
                                </div>

                                {/* Made FG */}
                                <div className="mb-0">
                                    <div className="d-flex align-items-center">
                                        <button onClick={() => handleIncrement(index, 'fieldGoalMade')} className="btn btn-primary btn-sm me-2"><span>Made FG: {stats[index].fieldGoalMade}</span></button>
                                        <button onClick={() => handleDecrement(index, 'fieldGoalMade')} className="btn btn-secondary btn-sm ms-0">-</button>
                                    </div>
                                </div>

                                {/* Missed FG */}
                                <div className="mb-0">
                                    <div className="d-flex align-items-center">
                                        <button onClick={() => handleIncrement(index, 'fieldGoalMissed')} className="btn btn-primary btn-sm me-2 mt-2"><span>Missed FG: {stats[index].fieldGoalMissed}</span></button>
                                        <button onClick={() => handleDecrement(index, 'fieldGoalMissed')} className="btn btn-secondary btn-sm ms-0 mt-2">-</button>
                                    </div>
                                </div>

                                {/* FGA */}
                                <div className="mb-0">
                                    <label className="form-label">FGA: {stats[index].fieldGoalAttempted} ({((stats[index].fieldGoalMade / (stats[index].fieldGoalAttempted || 1)) * 100).toFixed(1)}%)</label>
                                </div>

                                {/* Made 3PT */}
                                <div className="mb-0">
                                    <div className="d-flex align-items-center">
                                        <button onClick={() => handleIncrement(index, 'threePointerMade')} className="btn btn-primary btn-sm me-2"><span>Made 3PT: {stats[index].threePointerMade}</span></button>
                                        <button onClick={() => handleDecrement(index, 'threePointerMade')} className="btn btn-secondary btn-sm ms-0">-</button>
                                    </div>
                                </div>

                                {/* Missed 3PT */}
                                <div className="mb-0">
                                    <div className="d-flex align-items-center">
                                        <button onClick={() => handleIncrement(index, 'threePointerMissed')} className="btn btn-primary btn-sm me-2 mt-2"><span>Missed 3PT: {stats[index].threePointerMissed}</span></button>
                                        <button onClick={() => handleDecrement(index, 'threePointerMissed')} className="btn btn-secondary btn-sm ms-0 mt-2">-</button>
                                    </div>
                                </div>

                                {/* 3PTA */}
                                <div className="mb-0">
                                    <label className="form-label">3PTA: {stats[index].threePointerAttempted} ({((stats[index].threePointerMade / (stats[index].threePointerAttempted || 1)) * 100).toFixed(1)}%)</label>
                                </div>

                                {/* REB */}
                                <div className="mb-0">
                                    <div className="d-flex align-items-center">
                                        <button onClick={() => handleIncrement(index, 'rebounds')} className="btn btn-primary btn-sm me-2"><span>REB: {stats[index].rebounds}</span></button>
                                        <button onClick={() => handleDecrement(index, 'rebounds')} className="btn btn-secondary btn-sm ms-0">-</button>
                                    </div>
                                </div>

                                {/* AST */}
                                <div className="mb-0">
                                    <div className="d-flex align-items-center">
                                        <button onClick={() => handleIncrement(index, 'assists')} className="btn btn-primary btn-sm me-2 mt-2"><span>AST: {stats[index].assists}</span></button>
                                        <button onClick={() => handleDecrement(index, 'assists')} className="btn btn-secondary btn-sm ms-0 mt-2">-</button>
                                    </div>
                                </div>

                                {/* STL */}
                                <div className="mb-0">
                                    <div className="d-flex align-items-center">
                                        <button onClick={() => handleIncrement(index, 'steal')} className="btn btn-primary btn-sm me-2 mt-2"><span>STL: {stats[index].steal}</span></button>
                                        <button onClick={() => handleDecrement(index, 'steal')} className="btn btn-secondary btn-sm ms-0 mt-2">-</button>
                                    </div>
                                </div>

                                {/* BLK */}
                                <div className="mb-0">
                                    <div className="d-flex align-items-center">
                                        <button onClick={() => handleIncrement(index, 'block')} className="btn btn-primary btn-sm me-2 mt-2"><span>BLK: {stats[index].block}</span></button>
                                        <button onClick={() => handleDecrement(index, 'block')} className="btn btn-secondary btn-sm ms-0 mt-2">-</button>
                                    </div>
                                </div>

                                {/* TOV */}
                                <div className="mb-0">
                                    <div className="d-flex align-items-center">
                                        <button onClick={() => handleIncrement(index, 'turnover')} className="btn btn-primary btn-sm me-2 mt-2"><span>TOV: {stats[index].turnover}</span></button>
                                        <button onClick={() => handleDecrement(index, 'turnover')} className="btn btn-secondary btn-sm ms-0 mt-2">-</button>
                                    </div>
                                </div>

                                {/* Made FT */}
                                <div className="mb-0">
                                    <div className="d-flex align-items-center">
                                        <button onClick={() => handleIncrement(index, 'freeThrowMade')} className="btn btn-primary btn-sm me-2 mt-2"><span>Made FT: {stats[index].freeThrowMade}</span></button>
                                        <button onClick={() => handleDecrement(index, 'freeThrowMade')} className="btn btn-secondary btn-sm ms-0 mt-2">-</button>
                                    </div>
                                </div>

                                {/* Missed FT */}
                                <div className="mb-0">
                                    <div className="d-flex align-items-center">
                                        <button onClick={() => handleIncrement(index, 'freeThrowMissed')} className="btn btn-primary btn-sm me-2 mt-2"><span>Missed FT: {stats[index].freeThrowMissed}</span></button>
                                        <button onClick={() => handleDecrement(index, 'freeThrowMissed')} className="btn btn-secondary btn-sm ms-0 mt-2">-</button>
                                    </div>
                                </div>

                                {/* FTA */}
                                <div className="mb-0">
                                    <label className="form-label">FTA: {stats[index].freeThrowAttempted} ({((stats[index].freeThrowMade / (stats[index].freeThrowAttempted || 1)) * 100).toFixed(1)}%)</label>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* debug */}
            {/* <div>{ stats}</div> */}
            {/* <div>{ formattedStats}</div> */}
            <button type="button" className="btn btn-secondary ms-4 mb-2" onClick={copyStatsToClipboard}>Copy Stats to YouTube</button>
            <button type="submit" className="btn btn-primary ms-4 mb-2" onClick={handleSubmit}>Submit Stats</button>
            <div></div>
        </div>
    );
};

export default GameStatsRecorder;