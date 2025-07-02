import React, { useState } from 'react';

const AddPlayer = () => {
    const [player, setPlayer] = useState({
        name: '',
        height: '',
        weight: '',
        age: '',
        birthdate: '',
    });
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayer({
            ...player,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/players/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(player),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.text();
            alert(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to save player');
        }
        setPlayer({
            name: '',
            height: '',
            weight: '',
            age: '',
            birthdate: ''
        });
        setShowModal(false);
    };

    return (
        <div className="container mt-4">
            <button
                className="btn btn-secondary mb-2"
                onClick={() => setShowModal(true)}
            >
                Add New Player
            </button>

            {/* Modal for adding a player */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Player</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input type="text" name="name" value={player.name} onChange={handleChange} className="form-control" placeholder="Name" required />
                                </div>
                                <div className='row'>
                                    <div className='col-3'>
                                        <div className="mb-3">
                                            <input type="number" name="height" value={player.height} onChange={handleChange} className="form-control" placeholder="Height (cm)" />
                                        </div>
                                    </div>
                                    <div className='col-3'>
                                        <div className="mb-3">
                                            <input type="number" name="weight" value={player.weight} onChange={handleChange} className="form-control" placeholder="Weight (kg)" />
                                        </div>
                                    </div>
                                    <div className='col-3'>
                                        <div className="mb-3">
                                            <input type="number" name="age" value={player.age} onChange={handleChange} className="form-control" placeholder="Age" />
                                        </div>
                                    </div>
                                    <div className='col-3'>
                                        <div className="mb-3">
                                            <input type="date" name="birthdate" value={player.birthdate} onChange={handleChange} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Add Player</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPlayer;