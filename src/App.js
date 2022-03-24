import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import FitnessList from "./components/fitness-list.component";
import CreateExercise from "./components/create-exercise.component";
import EditExercise from "./components/edit-exercises.component";
import UpdateWeight from "./components/update-weight.component";
import CreateUser from "./components/create-user.component";
import WeightChart from "./components/weight-chart.component";


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/fitnessList" element={ <FitnessList />} />
          <Route path="/edit/:logon/:workoutid" element={<EditExercise />} />
          <Route path="/createExercise" element={<CreateExercise />} /> 
          <Route path="/updateWeight" element={<UpdateWeight />} />
          <Route path="/weightProgress" element={<WeightChart />} /> 
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
