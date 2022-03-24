import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function FitnessList() {
    const [cardio, setCardio] = useState([]);
    const [users, setUsers] = useState([]);
    const [fitness, setFitness] = useState([]);
    const [weight, setWeight] = useState(0);

    useEffect(() => {
        axios.get('https://fitnessapp-ck.herokuapp.com/exercises/')
            .then(response => {
                    setFitness(response.data)
                    setUsers(response.data.map(user => user.username))
                    setCardio(response.data.map(user => user.cardio))
            })
            .catch((error) => {
                console.log(error);
            })

        
    }, []);

    function deleteCardio(username, id) {
        axios.post('https://fitnessapp-ck.herokuapp.com/exercises/deleteCardio/' + username + "/" + id)
            .then(res => console.log(res.data))

        window.location.reload(false)
        
    }


    return (
        <div className="container">
            {/*
            {fitness.map(currentfitness => 
                <div>
                   {currentfitness.cardio.map(card => [
                        <p>{card.description}</p>,
                    ])}
                </div>
            )}
                */}

            {fitness.map(currentfitness => {
                return ([
                    <h3>{currentfitness.username}</h3>,
                    <p>Current Weight: {currentfitness.weight.slice(-1)[0].weight} kg</p>,
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Description</th>
                                <th>Duration</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentfitness.cardio.map(currentcardio => [
                                <tr>
                                    <td>{currentcardio.description}</td>
                                    <td>{currentcardio.duration}</td>
                                    <td>{currentcardio.date.substring(0,10)}</td>
                                    <td>
                                        <Link to={"../edit/"+ currentfitness.username + "/" + currentcardio._id}>edit</Link> |  
                                        <a href="#" onClick={() => 
                                            deleteCardio(currentfitness.username, currentcardio._id)}> delete</a>
                                    </td>
                                </tr>
                            ])}
                        </tbody>
                    </table>
                    
                ])
            })}

        </div>
    )
}

export default FitnessList;