import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

function navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">Fitness App</Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/fitnessList" className="nav-link">Fitness Log</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/createExercise" className="nav-link">Add New Exercise</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/updateWeight" className="nav-link">Update Weight</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/weightProgress" className="nav-link">Weight Progress</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/user" className="nav-link">Create New User</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default navbar;