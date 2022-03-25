import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";


function EditExercises() {
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);
    const { logon, workoutid } = useParams();

    useEffect(() => {
        axios.get('https://fitness-ck.herokuapp.com/exercises/'+ logon + "/" + workoutid)
            .then(response => {
                setUsername(logon);
                if (response.data.length > 0) {
                    setDescription(response.data[0].description)
                    setDuration(response.data[0].duration)
                    setDate(new Date(response.data[0].date))
                }
            })
        console.log(username)
    }, [])


    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function onChangeDescription(e) {
        setDescription(e.target.value);
    }

    function onChangeDuration(e) {
        setDuration(e.target.value);
    }

    function onChangeDate(date) {
        setDate(date);
    }

    function onSubmit(e) {
        e.preventDefault();

        const exercise = {
            description: description,
            duration: duration,
            date: date
        }

        console.log(exercise);
        console.log(workoutid)

        axios.post('https://fitnessapp-ck.herokuapp.com/exercises/updateCardio/' + username + "/" + workoutid, exercise)
            .then(res => console.log("workout updated"));

        window.location = '/fitnessList';
    }

    return (
        <div>
            <h3>Update Exercise</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>

                    <select
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}>
                        {
                            <option key={username.id} value={username}>{username}</option>
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditExercises;