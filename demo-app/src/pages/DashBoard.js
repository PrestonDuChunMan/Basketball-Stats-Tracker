import React, { useState } from 'react';
import AddPlayer from '../components/AddPlayer';
import AddGame from '../components/AddGame';
import AddGameStats from '../components/AddGameStats';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchGames();
    }

    fetchGames = async () => {
        try {
            const response = await fetch('http://localhost:8080/games');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            this.setState({ games: data, loading: false });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    }

    render() {
        const { games, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div className='container'>
                <div className='row '>
                    <div className='col-2'>
                        <AddPlayer />
                    </div>
                    <div className='col-2'>
                        <AddGame />
                    </div>
                    <div className='col-2 mt-4 mb-2'>
                        <AddGameStats />
                    </div>
                </div>
                <h3 className="ms-2">Recent Games</h3>

                <table className="table table-hover table-bordered rounded" style={{ borderRadius: '6px', overflow: 'hidden' }}>
                    <thead class="table-light">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Game</th>
                            <th scope="col">Home Team</th>
                            <th scope="col">Away Team</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map(game => (
                            <tr>
                                <th scope="row"><a href={`/game/${game.id}/${game.date}/${game.gameNumber}`} style={{ textDecoration: 'none' }}>{game.date}</a></th>
                                <td>{game.gameNumber}</td>
                                <td className='text-secondary'>{game.teamA}</td>
                                <td className='text-secondary'>{game.teamB}</td>
                                <td className='text-success'>{game.scoreA} - {game.scoreB}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ul>
                </ul>
            </div>
        );
    }
}

export default DashBoard;