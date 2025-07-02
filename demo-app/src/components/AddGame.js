import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddGame = () => {
    const [game, setGame] = useState({
        date: '',
        gameNumber: 'Game 0',
        teamA: '',
        teamB: '',
        scoreA: '',
        scoreB: '',
    });
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGame({
            ...game,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!game.teamA) {
            game.teamA = 'teamA';
        }
        if (!game.teamB) {
            game.teamB = 'teamB';
        }
        try {
            const response = await fetch('http://localhost:8080/games/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(game),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            alert('Game added successfully: ' + data);
        } catch (error) {
            console.error('Error:', error);
            alert('E.added game');
        }

        setGame({
            date: '',
            gameNumber: 'Game 0',
            teamA: '',
            teamB: '',
            scoreA: '',
            scoreB: ''
        });
        setShowModal(false);
    };
    const openModal = () => {
        // Increment game number each time the modal is opened
        setGame(prevGame => ({
            ...prevGame,
            gameNumber: `Game ${parseInt(prevGame.gameNumber.split(' ')[1]) + 1}`
        }));
        setShowModal(true);
    };

    return (
        <div className="container mt-4">
            <button
                className="btn btn-secondary mb-2"
                onClick={openModal}
            >
                Add New Game
            </button>

            {/* Modal for adding a game */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Game</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <input type="date" name="date" value={game.date} onChange={handleChange} className="form-control" required />
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <input type="text" name="gameNumber" value={game.gameNumber} onChange={handleChange} className="form-control" placeholder="Game Number" required />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <input type="text" name="teamA" value={game.teamA} onChange={handleChange} className="form-control" placeholder="Team A" />
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <input type="text" name="teamB" value={game.teamB} onChange={handleChange} className="form-control" placeholder="Team B" />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className='row'>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <input type="number" name="scoreA" value={game.scoreA} onChange={handleChange} className="form-control" placeholder="Score A" />
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <input type="number" name="scoreB" value={game.scoreB} onChange={handleChange} className="form-control" placeholder="Score B" />
                                        </div>
                                    </div>
                                </div> */}
                                <button type="submit" className="btn btn-primary">Add Game</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddGame;