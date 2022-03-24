import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'chart.js/auto';
import { Line  } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

/*
let realWeightData =  weightData.map(elem => (
        { x: elem.date, y: elem.weight }
))
*/


function Chart() {
    
    const [weightDate, setWeightDate] = useState([]);
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username));
                    setUsername(response.data[0].username)
                }

                axios.get('http://localhost:5000/exercises/weight/steph' )
                    .then(response => {
                        setWeightDate(response.data)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
    }, []);

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/weight/' + username)
            .then(response => {
                setWeightDate(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [username])
    
    console.log(username);
    console.log(weightDate);

    let weightDateChart = weightDate.map(elem => (
        { x: elem.date.substring(0,10), y: elem.weight }
    ));

    console.log(weightDateChart);

    
    const testWeight = [
        { x: "2022-02-28", y: 50 },
        { x: "2022-03-02", y: 20},
        { x: "2022-03-15", y: 30 }
    ]

    const data = {
        datasets: [{
            label: '# of Votes',
            data: weightDateChart,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
        }]
    }

    return (
        <div>
            
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

                
            <div>
                <Line 
                data={data} 
                height={100}
                width={150}
                options={{
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: {
                            type: 'time',
                            time: {
                                unit: 'day'
                            }
                        },
                        yAxes: 
                            {
                                ticks: {
                                    stepSize: 1
                                },
                                beginAtZero: false
                            }
                    }
                }}
                />
            </div>
        </div>
    )
}

export default Chart;