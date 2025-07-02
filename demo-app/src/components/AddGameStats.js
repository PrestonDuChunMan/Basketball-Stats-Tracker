import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddGameStats = () => {
    const [numPlayers, setNumPlayers] = useState(2);
    const [isOpen, setIsOpen] = useState(false);
    const [players, setPlayers] = useState([]);
    const [games, setGames] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [selectedGame, setSelectedGame] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // Fetch players and games from the server
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('http://localhost:8080/players');
                const data = await response.json();
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:8080/games');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched games:', data); // Debug: log the fetched games
                setGames(data); // Correctly set the games state here
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchPlayers();
        fetchGames();
    }, []);

    const handlePlayerSelect = (playerId, team) => {
        setSelectedPlayers((prev) => {
            const existingPlayer = prev.find(p => p.id === playerId);
            if (existingPlayer) {
                return prev.map(p =>
                    p.id === playerId ? { ...p, team } : p
                );
            }
            return [...prev, { id: playerId, team, name:selectedPlayers.name }]; //***** */
        });
    };

    const handleProceed = () => {
        console.log('Selected Players:', selectedPlayers);
        console.log('Selected Game:', selectedGame);
        if (selectedGame) {
            navigate('/game/game_stats', { state: { selectedPlayers, selectedGame, games: games.find(g => g.id === selectedGame) } });
            setShowModal(false);
            setIsOpen(false);
        }
        if (!selectedGame) {
            alert("Please select game")
        }
    };

    return (
        <div className="container">
            <button
                className="btn btn-secondary mb-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Hide Add Game Stats' : 'Add Game Stats'}
            </button>
            <div className={`collapse ${isOpen ? 'show' : ''}`}>
                <div className="mb-3">
                    <label className="form-label">Number of Players</label>
                    <select
                        value={numPlayers}
                        onChange={(e) => setNumPlayers(e.target.value)}
                        className="form-select"
                    >
                        {[...Array(9).keys()].map(i => (
                            <option key={i + 2} value={i + 2}>{i + 2}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    Select Players
                </button>
            </div>

            {/* Modal for selecting players and game */}
            <div
                className={`modal fade ${showModal ? 'show' : ''}`}
                id="playerModal"
                tabIndex="-1"
                aria-labelledby="playerModalLabel"
                aria-hidden={!showModal}
                style={{ display: showModal ? 'block' : 'none' }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="playerModalLabel">Select Players and Game</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <h6>Select Players:</h6>
                            {players.map(player => (
                                <div key={player.id} className="mb-2 d-flex align-items-center">
                                    <input
                                        id={ player.id}
                                        type="checkbox"
                                        onChange={(e) => handlePlayerSelect(player.id, e.target.checked ? 'teamA' : '')}
                                        className="me-2"
                                    />
                                    <label for={ player.id}>{player.name}</label>
                                    <select
                                        onChange={(e) => handlePlayerSelect(player.id, e.target.value)}
                                        defaultValue="teamA"
                                        className="form-select ms-2"
                                    >
                                        <option value="teamA">Team A</option>
                                        <option value="teamB">Team B</option>
                                    </select>
                                </div>
                            ))}
                            <h6 className="mt-3">Select Game:*</h6>
                            <select
                                value={selectedGame}
                                onChange={(e) => setSelectedGame(e.target.value)}
                                className="form-select"
                            >
                                <option value="">-- Select Game --</option>
                                {games.map(game => (
                                    <option key={game.id} value={game.id}>{game.date} { game.gameNumber}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleProceed}
                            >
                                Proceed to Stats
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddGameStats;