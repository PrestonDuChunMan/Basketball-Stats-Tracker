import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const AllPlayers = () => {
    const { playerId, playerName } = useParams();
    const [averages, setAverages] = useState([]);
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllPlayers();
    }, []);

    const fetchPlayerAverages = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/player/${id}/averages`);
            if (!response.ok)
                throw new Error('Network not ok')
            const data = await response.json();
            setAverages(data);

        } catch (error) {
            console.log("fetch error: " + error);
            setError(error.message);
        }

    }

    const fetchAllPlayers = async () => {
        try {
            const response = await fetch('http://localhost:8080/players');
            if (!response.ok)
                throw new Error('Network not ok')
            const data = await response.json();
            setPlayers(data);
            setLoading(false);
        } catch (error) {
            console.log("fetch error: " + error);
            setLoading(false);
            setError(error.message);
        }
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
      }

    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    {players.map(player => (
                        <div key={player.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{player.name}</h5>
                                    <a href={`/player/${player.id}/${player.name}`} className="btn btn-link">Game Averages</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </>
    )
}

export default AllPlayers;