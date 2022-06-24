const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Goal = require('./models/goal');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/goals', async (req, res) => {
    console.log('TRYING TO FETCH GOALS');
    try {
        const goals = await Goal.find();
        res.status(200).json({
            goals: goals.map(goal => ({
                id: goal.id,
                text: goal.text,
            })),
        });
        console.log('FETCHED GOALS');
    } catch (err) {
        console.error('ERROR FETCHING GOALS');
        console.error(err.message);
        res.status(500).json({ message: 'Failed to load goals.' });
    }
});

app.post('/goals', async (req, res) => {
    console.log('TRYING TO STORE GOAL');
    const goalText = req.body.text;

    if (!goalText || goalText.trim().length === 0) {
        console.log('INVALID INPUT - NO TEXT');
        return res.status(422).json({ message: 'Invalid goal text.' });
    }

    const goal = new Goal({
        text: goalText,
    });

    try {
        await goal.save();
        res.status(201).json({
            message: 'Goal saved',
            goal: { id: goal.id, text: goalText },
        });
        console.log('STORED NEW GOAL');
    } catch (err) {
        console.error('ERROR FETCHING GOALS');
        console.error(err.message);
        res.status(500).json({ message: 'Failed to save goal.' });
    }
});

app.delete('/goals/:id', async (req, res) => {
    console.log('TRYING TO DELETE GOAL');
    try {
        await Goal.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Deleted goal!' });
        console.log('DELETED GOAL');
    } catch (err) {
        console.error('ERROR FETCHING GOALS');
        console.error(err.message);
        res.status(500).json({ message: 'Failed to delete goal.' });
    }
});

const delay = ms => new Promise(res => setTimeout(res, ms));
let retries = +process.env.MONGODB_CONNECT_RETRIES || 5;

async function start() {
    retries--;
    try {
        await mongoose.connect(
            `mongodb://${process.env.MONGODB_URL}:27017/?authSource=admin`,
            {
                user: process.env.MONGODB_USERNAME,
                pass: process.env.MONGODB_PASSWORD,
                dbName: 'course-goals',
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    } catch (err) {
        console.error(`Connect to DB Error: ${err.message}`);
        if (retries) {
            console.log(
                `Retrying connection in 10s...(${retries} retries left)`
            );
            await delay(10000);
            start();
            return;
        }
        process.exit(1);
    }
    app.listen(80, console.log.bind(null, 'Server listening on port 80.'));
}

start();
