const express = require('express');
const router = express.Router();
const db = require('../models');

//Gets all workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
          $addFields: {
            totalDuration:{$sum: "$exercises.duration"}
          }
        }
      ]) 
        .then((dbWorkout) => {
          res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

// Add an exercise
router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $push: { exercises: req.body }
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
});

//Creates a workout
router.post("/api/workouts", ({ body }, res) => {
    console.log(body);
    db.Workout.create(body).then((dbWorkout => {
        res.json(dbWorkout);
    })).catch(err => {
        res.json(err);
    });
});

// Get workouts in a range
router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([{
        $addFields: {
          totalDuration:{$sum: "$exercises.duration"}
        }
      }])
        .sort({_id:-1}).limit(7)
        .then(dbWorkout => {
          res.json(dbWorkout);
        })
        .catch((err) => {
          res.json(err);
        });
});

module.exports = router