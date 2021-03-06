const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema ({
    day: {
        type: Date,
        default: Date.now
    },
    exercises : [
    {
        type: {
            type: String,
            trim: true
        },
        name: {
            type: String,
            trim: true,
        },
        duration:  Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number,
    }],
    totalDuration : Number,
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;