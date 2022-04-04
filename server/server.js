const express = require('express');
const { v4: getUUIDv4 } = require(`uuid`);
const config = require(`./config`);
const mysql = require(`mysql2`);
const bcrpyt = require(`bcrypt`);
const cors = require(`cors`);
const bodyParser = require('body-parser');
const userQueries = require('./queries/userQueries');
const eventQueries = require('./queries/eventQueries');

// ---- Config -------------------------
const db = mysql.createConnection(config.db);
const saltRounds = 13; // ~20 hashes/s

db.connect((error) => {
    if (error) console.log(`Error connecting to ${config.db.database}: ${error}`);
    console.log(`***Connected to ${config.db.database}.`);
});

const app = express()
app.use(cors());
app.use(bodyParser.json());
const PORT = 3000;

let query = '', queryParams = [];

// ---- Routes ------------------------- 

// Check status
app.get('/', (req, res) => {
    res.send(`Node and express server running`)
})

// ---- User ---------------------------

// User Login Authentication, return [username, email] if valid, null if not
app.get('/login/:userCred/:userPassword', async (req, res) => {
    const { userCred, userPassword } = req.params;
    query = userQueries.authenticateLogin;
    queryParams = [userCred];

    console.log(`***Attempted login by user '${queryParams[0]}' query: '${query}'...`);


    let result = db.query(query, queryParams, async function (err, results) {
        if (err) { console.log(`*****${err}`); }

        if (result != null) { // If we found something, attempt to send json packet
            const comp = await bcrpyt.compare(userPassword, results[0].password);
            const c = results[0].password;
            console.log(`entered: '${userPassword}', actual: '${c}', comparison: ${comp}`);
            if (comp) {
                const rjp = {
                    message: "Query ran successfully.",
                    data: {
                        uID: results[0].uID,
                        username: results[0].username,
                        email: results[0].email
                    },
                    successCode: true
                }
                console.log(`***${rjp.message} Found ${results.length} results.`);
                res.send(rjp);
            } else {
                const rjp = {
                    message: "Query ran successfully.",
                    data: "Login attempt failed. Invalid password", // pass back query results
                    successCode: false
                }
                console.log(`***Failed login attempt for user ${userCred}.`);
                res.send(rjp);
            }

        }
    });


});

// User Signup, returns mySQL code if valid, null if not
app.get('/signup/:userCred/:userPassword/:userEmail', async (req, res) => {
    let { userCred, userPassword, userEmail } = req.params;

    // User Bcrypt to hash a password and save it with the db
    const salt = await bcrpyt.genSalt(saltRounds); // ~20 hashes/s
    userPassword = await bcrpyt.hash(userPassword, salt);

    query = userQueries.signup;
    queryParams = [userCred, userPassword, userEmail];

    console.log(`***Attempted addUser: '${queryParams[0]}' with '${queryParams[2]}' query: '${query}'...`);

    db.query(query, queryParams, async function (err, result) {
        if (err) {
            console.log(`*****${err}`);
            const rjp = {
                message: "Error occured trying to insert user. Try again??",
                data: null,
                successCode: false
            }
            res.send(rjp);
        }

        if (result != null) {
            const rjp = {
                message: "Insert ran successfully.",
                data: result, // pass back return code
                successCode: true
            }
            console.log(`***${rjp.message}`);
            res.send(rjp);
        }
    })
});

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

