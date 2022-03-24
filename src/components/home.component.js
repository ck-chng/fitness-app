import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import workoutImage from '../images/barbell-workout.jpeg'

const Jumbotron = () => {
    return <div className="jumbotron container">
        <h1 className="display-4">Fitness App</h1>
        <h3 className="lead">Your one-stop page to easily track your workout progress!</h3>
            <div className="jumbo-bottom">
            <a className="btn btn-primary btn-lg jumbo-bottom" href="/user" role="button">Get Started</a>
            </div>
        
    </div>
};

function Home() {
    return (
        <div>
            <Jumbotron title="hello" style={{backgroundImage: `url(workoutImage )`}} />
        </div>
       
    )
}

export default Home;