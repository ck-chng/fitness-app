const router = require('express').Router();
let User = require('../models/user.model');
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err))
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const weight = req.body.weight;

    //newUser document
    const newUser = new User({username});
    const newExerciseUser = new Exercise({
        username
    })

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));

    newExerciseUser.save()
        .then(() => res.json('Exercise User added!'))
        .catch(err => res.status(400).json('Error: ' + err));

    
});

module.exports = router;