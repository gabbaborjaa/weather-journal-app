// INSTANTIATE REQUIRED MODULES
//
// express server
const express = require('express');
// parser to parse incoming request bodies
const bodyParser = require('body-parser');
// set up CORS (Cross-Origin Resource Sharing) to allow restricted resources on a web page to be requested
const cors = require('cors');


// create the app instance using express
const app = express();

// server port number
const SERVER_PORT = 4050;
// server hostname
const SERVER_HOSTNAME = "localhost";

// API endpoint object to which weather data will be stored
let projectData = {};

/**
 * Identify the server being listened to.
 */
function listening() {
    console.log(`Server running on ${SERVER_HOSTNAME}: ${SERVER_PORT}`);
}

/**
 * Get weather service response data.
 * 
 * @param {*} req request
 * @param {*} res response data
 */
function getData(req, res) {
    res.status(200).send(projectData);
}

/**
 * Post weather service response data.
 * 
 * @param {*} req request
 * @param {*} res response data
 */
function postData(req, res) {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}

// set up app to use parser middleware which only parses url-encoded bodies
// NOTE: the 'body-parser' npm module has been deprecated (will no longer be maintained), 
//   but is being used here only to implement what is specified in the project specs.
app.use(bodyParser.urlencoded({ extended: false }));
// set up app to use parser middleware which only parses JSON
app.use(bodyParser.json());
// set up app to use "cors"
app.use(cors());
// initialize main project folder
app.use(express.static('website'));

app.get("/all", getData);
app.post("/add", postData);

// set/spin up express server
app.listen(SERVER_PORT, listening);