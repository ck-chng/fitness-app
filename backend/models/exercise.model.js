const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardioSchema = new Schema({
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true,
}); 

const strengthSchema = new Schema({
    description: { type: String, required: true },
    set: { type: Number, required: true },
    repPerSet: {type: Number, required: true},
    weight: { type: Number, required: true},
    date: { type: Date, required: true }
}, {
    timestamps: true,
}); 

const calorieSchema = new Schema({
    food: { type: String, required: true },
    quantity: { type: Number, required: true },
    calorie: { type: Number, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true,
}); 

const weightSchema = new Schema({
    weight: {type: Number, required: true},
    date: { type: Date, required: true }
})

const exerciseSchema = new Schema({
    username: {type: String, required: true},
    cardio: [cardioSchema],
    strength: [strengthSchema],
    calorie: [calorieSchema],
    weight: [weightSchema]
}, {
    timestamps: true,
});


const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
