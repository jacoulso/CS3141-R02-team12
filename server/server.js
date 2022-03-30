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

// ---- Login --------------------------
// app.get('/login', (req, res) => {
//     const { username, password } = req.body;
//     console.dir(`Attempted login with: userCred: ${userCred}`);
//     res.send(`home/home`);
// });

// app.post('/login', async (req, res) => {
//     const {username, password} = req.body;
//     const hash = await bycrpt.hash(password, 12);
//     res.send(`home/home`);
// });

// User Login Authentication, return [username, email] if valid, null if not
app.get('/login/:userCred/:userPassword', (req, res) => {
    const { userCred, userPassword } = req.params;
    query = userQueries.authenticateLogin;
    queryParams = [userCred, userPassword];

    console.log(`***----------------------------------------------------------------`);
    console.log(`***Attempted login by user '${queryParams[0]}' query: '${query}'...`);

    db.query(query, queryParams, (err, result) => {
        if (err) {
            console.log(`*****${err}`);
        }

        if (result != null) { // If we found something, send json packet
            const rjp = {
                message: "Query ran successfully.",
                data: result // pass back query results
            }
            console.log(`***${rjp.message} Found ${result.length} results.`);
            res.send(rjp);
        }
    })
});

// ---- Calendars -----------------------

// ---- Events --------------------------
app.get('/event/:eID/:uID', (req, res) => {
    const { eID, uID } = req.params;
    console.dir(`eID: ${eID}, uID: ${uID}`);
    res.send(`eID: ${eID}, uID: ${uID}`);
});

app.post('/event', (req, res) => {
    console.dir("Called event request...");
    res.send('Mega Worm test');
})

app.listen(PORT, () => {
    console.log(`***Listening on port ${PORT}...`)
})

