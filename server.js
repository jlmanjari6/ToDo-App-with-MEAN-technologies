//imports from node_modules
var express = require('express');
var path = require('path'); // no need to install explicitly bcoz it's a system module
var bodyParser = require('body-parser');

//for our two web pages - index and tasks
var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();

// set up view engine
app.set("views", path.join(__dirname, 'views')); // to set the folder to use for views. 
app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile); // to render files with html extension

// set static folder to put angular stuff
app.use(express.static(path.join(__dirname, 'client')));

// body parser middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up routes
app.use('/', index);
app.use('/api', tasks);

app.listen(3000, function () {
    console.log("listening to port 3000...");
});