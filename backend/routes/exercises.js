const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err))
});

router.route('/weight/:username').get((req, res) => {
    Exercise.findOne({ username: req.params.username })
        .then(exercise => res.json(exercise.weight))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:username/:workoutid').get((req, res) => {
    Exercise.findOne({username: req.params.username})
        .then(exercise => res.json(exercise.cardio.filter(a => {if(a._id==req.params.workoutid){return a}})))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const weight = Number(req.body.weight);

    const newExercise = new Exercise({
        username
    })

    newExercise.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
*/

router.route('/addCardio/:username').post((req, res) => {
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    Exercise.findOneAndUpdate({"username": req.params.username}, {
        $addToSet: {
            "cardio": {
                description: description,
                duration: duration,
                date: date
            },
        },
        $each: [],
        $sort: { date: -1 }
        
    }).then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err))

});

router.route('/updateCardio/:username/:workoutid').post((req, res) => {
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    Exercise.findOneAndUpdate({username: req.params.username}, {
        $set: {
            "cardio.$[el].description": description,
            "cardio.$[el].duration": duration,
            "cardio.$[el].date": date,

        }}, {
            arrayFilters: [{"el._id": req.params.workoutid}],
            new: true
        }
        ).then(() => res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err))

});

router.route('/deleteCardio/:username/:workoutid').post((req,res) => {
    Exercise.findOneAndUpdate({username: req.params.username}, {
        $pull: {
            "cardio": {
                "_id": req.params.workoutid
            }
        }
    }).then(() => res.json('Exercise deleted!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/addStrength/:id').post((req, res) => {
    const description = req.body.description;
    const set = Number(req.body.set);
    const repPerSet = Number(req.body.repPerSet);
    const weight = Number(req.body.weight);
    const date = Date.parse(req.body.date);

    Exercise.findByIdAndUpdate(req.params.id, {
        $addToSet: {
            "strength": {
                description: description,
                set: set,
                repPerSet: repPerSet,
                weight: weight,
                date: date
            }
        }
    }).then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err))    
});

router.route('/updateStrength/:id/:workoutid').post((req, res) => {
    const description = req.body.description;
    const set = Number(req.body.set);
    const repPerSet = Number(req.body.repPerSet);
    const weight = Number(req.body.weight);
    const date = Date.parse(req.body.date);

    Exercise.findByIdAndUpdate(req.params.id, {
        $set: {
            "strength.$[el].description": description,
            "strength.$[el].set": set,
            "strength.$[el].repPerSet": repPerSet,
            "strength.$[el].weight": weight,
            "strength.$[el].date": date
        }
    }, {
        arrayFilters: [{ "el._id": req.params.workoutid }],
        new: true
    }).then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/deleteStrength/:id/:workoutid').delete((req, res) => {
    Exercise.findByIdAndUpdate(req.params.id, {
        $pull: {
            "strength": {
                "_id": req.params.workoutid
            }
        }
    }).then(() => res.json('Exercise deleted!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/addCal/:id').post((req, res) => {
    const food = req.body.food;
    const quantity = Number(req.body.quantity);
    const calorie = Number(req.body.calorie);
    const date = Date.parse(req.body.date);

    Exercise.findByIdAndUpdate(req.params.id, {
        $addToSet: {
            "calorie": {
                food: food,
                quantity: quantity,
                calorie: calorie,
                date: date
            }
        }
    }).then(() => res.json('Calorie added!'))
        .catch(err => res.status(400).json('Error: ' + err))

});

router.route('/updateWeight/').post((req, res) => {
    const username = req.body.username;
    const weight = Number(req.body.weight);
    const date = Date.parse(req.body.date);

    Exercise.findOneAndUpdate({"username": username}, {
        $addToSet: {
            "weight": {
                weight,
                date
            }
        }
    }).then(() => res.json('Weight updated!'))
        .catch(err => res.status(400).json('Error: ' + err))

});

module.exports = router;