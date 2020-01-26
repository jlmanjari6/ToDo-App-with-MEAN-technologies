var express = require('express');
var router = express.Router();
var db;

var mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
// Connection URL
const url = 'mongodb+srv://manjudb:manju7@1@cluster0-ace2v.mongodb.net/test?retryWrites=true&w=majority';
// Database Name
const dbName = 'manjudb';
// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    if (err) {
        console.log("Connection error!")
    }
    else {
        console.log("Connected successfully to server");
        db = client.db(dbName);
    }
});

//set routes for home page

// GET all tasks (Read)
router.get('/tasks', function (req, res, next) {
    db.collection("tasks").find({}).toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// GET single task (Read)
router.get('/tasks/:id', function (req, res, next) {
    db.collection("tasks").findOne({ '_id': mongodb.ObjectID(req.params.id) }, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});


// POST task (Create)
router.post('/task', function (req, res, next) {
    var task = req.body;
    if (!task.title || !(task.isDone + '')) {
        res.status(400);
        res.json({
            'error': 'bad data'
        })
    }
    else {
        db.collection('tasks').insertOne(task, function (err, result) {
            if (err) throw err;
            console.log("test: ", result);
            res.send(result);
        });
    }
});

// DELETE single task (Delete)
router.delete('/tasks/:id', function (req, res, next) {
    db.collection("tasks").deleteOne({ '_id': mongodb.ObjectID(req.params.id) }, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// PUT single task (Update)
router.put('/tasks/:id', function (req, res, next) {
    var task = req.body;
    var updatedTask = {};

    if (task.isDone) {
        updatedTask.isDone = task.isDone;
    }
    if (task.title) {
        updatedTask.title = task.title;
    }

    if (!updatedTask) {
        res.status(400);
        res.json({
            'error': 'bad data'
        })
    }
    else {
        db.collection("tasks").update({ '_id': mongodb.ObjectID(req.params.id) }, updatedTask, {}, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    }
});


module.exports = router;