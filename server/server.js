const express = require('express');
const config = require(`./config`);
const mysql = require(`mysql2`);
const bcrpyt = require(`bcrypt`);
const cors = require(`cors`);
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');
const eventQueries = require('./queries/eventQueries');

// ---- Config -------------------------
const db = mysql.createConnection(config.db);

db.connect((error) => {
    if (error) console.log(`Error connecting to ${config.db.database}: ${error}`);
    console.log(`***Connected to ${config.db.database}.`);
});

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({extended: true})); // enables form posting
app.use(bodyParser.json());
const PORT = 3000;

let query = '', queryParams = [];

// ---- Routes ------------------------- 

// Check status
app.get('/', (req, res) => {
    res.send(`Node and express server running`)
})

app.use('/', userRouter);

// ---- Calendars -----------------------

// ---- Events --------------------------

// List all events from a user
app.get('/events/:uID', (req, res) => {
    const { uID } = req.params;
    query = eventQueries.getAllEvents;

    console.log(`***Attempted to get all events for user with ID: '${uID}.' Query: '${query}'...`);

    db.query(query, uID, (err, result) => {
        if (err) {
            console.log(`*****${err}`);
            res.send(err);
        }

        if (result != null) {
            const rjp = {
                message: "Query ran successfully.",
                data: result // pass back return code
            }
            console.log(`***${rjp.message}`);
            res.send(rjp);
        }
    })
});

// List specific event from a user
app.get('/events/:uID/:eID', (req, res) => {
    const { eID, uID } = req.params;
    query = eventQueries.getEvent;
    queryParams = [eID, uID];

    console.log(`***Attempted to get event with ID: '${queryParams[0]}' for user with ID: '${queryParams[1]}' query: '${query}'...`);

    db.query(query, queryParams, (err, result) => {
        if (err) {
            console.log(`*****${err}`);
            res.send(err);
        }

        if (result != null) {
            const rjp = {
                message: "Query ran successfully.",
                data: result // pass back return code
            }
            console.log(`***${rjp.message}`);
            res.send(rjp);
        }
    })
});

// Create new Event for given user
app.post('/events/:uID/:eID', (req, res) => {
    query = eventQueries.getEvent;
    queryParams = req.params; // No deconstruction -> Assuming following ordered schema from Events table

    console.log(`***Attempted to get events for: '${queryParams[0]}' with '${queryParams[1]}' query: '${query}'...`);

    db.query(query, queryParams, (err, result) => {
        if (err) {
            console.log(`*****${err}`);
            res.send(err);
        }

        if (result != null) {
            const rjp = {
                message: "Query ran successfully.",
                data: result // pass back return code
            }
            console.log(`***${rjp.message}`);
            res.send(rjp);
        }
    })
});

//------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`***Listening on port ${PORT}...`)
})

