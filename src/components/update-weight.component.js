import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

function UpdateWeight() {
    const [weight, setWeight] = useState('');
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username));
                }
            })
    }, [])

    function onChangeWeight(e) {
        setWeight(e.target.value);
    }

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();

        const userWeight = {
            username: username,
            weight: weight,
            date: new Date().toISOString().slice(0, 10)
        }

        console.log(userWeight);

        axios.post('http://localhost:5000/exercises/updateWeight', userWeight)
            .then(res => console.log(res.data));

        setWeight('');
    }

    return (
        <div>
            <h3>Update your weight</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>

                    <select
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}>
                        {
                            users.map(user => {
                                return <option key={user} value={user}>{user}</option>
                            })
                        }
                    </select>
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
                    <input type="submit" value="Update" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default UpdateWeight;