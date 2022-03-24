import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CreateUser() {
    const [username, setUsername] = useState('');
    const [weight, setWeight] = useState(0);

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function onChangeWeight(e) {
        setWeight(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();

        const user = {
            username: username
        }

        const userWeight = {
            username: username,
            weight: weight,
            date: new Date().toISOString().slice(0, 10)
        }

        console.log(user);

        axios.post('https://fitnessapp-ck.herokuapp.com/users/add', user)
            .then(res => console.log(res.data));

        axios.post('https://fitnessapp-ck.herokuapp.com/exercises/updateWeight', userWeight)
            .then(res => console.log(res.data));

        setUsername('');
        setWeight(0);
    }

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>

                    <input type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}
                        />
                </div>

                <div className="form-group">
                    <label>Weight (kg): </label>

                    <input type="text"
                        required
                        className="form-control"
                        value={weight}
                        onChange={onChangeWeight}
                    />
                </div>

                <div className="form-group fitness-submit">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser;