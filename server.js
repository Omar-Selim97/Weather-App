// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
//Require body-parser to deal with json data
const bodyParse = require('body-parser');
//Require cors
const cors = require('cors');
// Start up an instance of app making object from express
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder for html file and app.js
app.use(express.static('website'));
//Get route
//arrow function return our object
const getWeather = (req, res) => {
    res.send(projectData)
}
app.get('/weather', getWeather)
    //Post route
const addData = (request, response) => {
    projectData = request.body;
    console.log(projectData);
    response.send(projectData);
}
app.post('/addData', addData)


// Setup Server
const port = 8080;
const run = () => {
    console.log(`your server is donig well at ${port}`);
}
app.listen(port, run);
/* Notes
    1-line through body-parser
    //here they say not to use body-parser anymore so what the true?
    //https://stackoverflow.com/questions/30126189/non-deprecated-alternative-to-body-parser-in-express-js
*/