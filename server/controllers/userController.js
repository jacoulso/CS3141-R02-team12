const jwt = require('jsonwebtoken')
const query = require('../queries/userQueries');
const bcrpyt = require('bcrypt');
const mysql = require(`mysql2`);
const config = require(`../config`);

// Startup
const db = mysql.createConnection(config.db);

// Create user function
exports.register = async function (req, res) {
    const { username, email, password, confirmPassword } = req.body;

    console.log(`***New user register requested. Performing sanity checks...`);
    // Perform sanity checks
    if (!username) {
        return res.status(422).json({ 'error': 'Please provide an username.' }); // code 422 -> 'server received info but doesn't know how to process'
    } else if (!email) {
        return res.status(422).json({ 'error': 'Please provide an email.' });
    } else if (!password) {
        return res.status(422).json({ 'error': 'Please provide a password.' });
    } else if (!confirmPassword) { return res.status(422).json({ 'error': `Cannot confirm password if you don't supply anything...` }); }

    if (password != confirmPassword) return res.status(422).json({ 'error': `Passwords do not match.` })

    // Look for an existing user with these credentials, if there isn't one, call save
    console.log(`***Connecting to ${config.db.database}...`)

    try {
        // Open a connection
        db.connect((error) => {
            if (error) console.log(`Error connecting to ${config.db.database}: ${error}`);
            console.log(`***Connected.`);
        });

        // Look to see if we already have a user with the credentials
        db.query(query.lookForOne, [username, email], async function (err, results) {
            if (err) { console.log(`*****${err}`); }

            // End of sanity check
            if (results[0] != null) { // If we didn't find anyone, register the user
                console.log(`***Passed sanity check! Found a user using those credentials. Aborting...`);
                return res.status(422).json({ 'error': 'Someone is already using that username or email!' });
            } else {

                console.log(`***Passed sanity checks! Registering user...`);

                const salt = await bcrpyt.genSalt(config.jwt.saltRounds);
                const hashPass = await bcrpyt.hash(password, salt);

                db.query(query.signup, [username, hashPass, email], async function (err, result) {
                    if (err) {
                        console.log(`*****${err}`);
                        const rjp = {
                            message: "Error occured trying to insert user. Try again??",
                            data: null,
                            successCode: false
                        }
                        res.status(200).json(rjp); // code 200 -> 'Ok'
                    }

                    if (result != null) {
                        const rjp = {
                            message: "Insert ran successfully.",
                            data: result, // pass back return code
                            successCode: true
                        }
                        console.log(`***${rjp.message}`);
                        res.status(200).json(rjp);
                    }
                });
            }

        });
    } catch (err) {
        console.log(err);
    }
}

// User login function
exports.login = async function (req, res) {
    const { userCred, userPassword } = req.body;

    console.log(`***Attempted login by user '${userCred}'...`);
    // Perform sanity checks
    if (!userCred) {
        return res.status(422).json({ 'error': 'Please provide an username.' });
    } else if (!userPassword) {
        return res.status(422).json({ 'error': 'Please provide a password.' });
    }
    // End sanity check

    console.log(`***End of sanity check! Connecting to ${config.db.database}...`);
    try {
        // Open a connection
        db.connect((error) => {
            if (error) console.log(`Error connecting to ${config.db.database}: ${error}`);
        });
        db.query(query.authenticateLogin, [userCred], async function (err, results) {
            if (err) { console.log(`*****${err}`); }

            if (results != null) { // If we found something, attempt to send json packet
                const comp = await bcrpyt.compare(userPassword, results[0].password);
                if (comp) {
                    // If we have a valid login, sign it and ship it
                    json_token = jwt.sign({
                        uID: results[0].uID,
                        username: results[0].username,
                        email: results[0].email
                    },
                        config.jwt.secret,
                        { expiresIn: '8h' } // give em time to mess around
                    );
                    console.log(`***Login succesful.`);
                    res.json(json_token);
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
    } catch (err) { console.log(err); }
}

// Helper to authenticate
// Optional next parameter to call an additional function, don't think it'll ever be necessary due to desync between main app and server, but nice to have anyway...
exports.authenticateLogin = async function (req, res, next) {
    console.log(`***Authentication requested...`);
    const token = req.headers.authorization;
    try {
        console.log(`***Parsing ${token}`)
        if (token) { // 'is truthy'
            const user = { uID, username, email } = parseToken(token);
            // Open a connection
            db.connect((error) => {
                if (error) console.log(`Error connecting to ${config.db.database}: ${error}`);
            });
            console.log("Connected.");
            const result = db.query(query.lookForOne, [user.username, user.email], function (err, results) {
                if (err) { console.log(`*****${err}`); }
            });
            console.log(result);
            if (result == user) {
                return res.locals.user = user; // Is valid, return the user data
                next();
            } 
        } else {
            return res.status(422).json({ 'error': 'Unauthorized login!' })
        }
    } catch (err) {
        console.log(err);
        res.status(403).json({
            success: false,
            message: err
        })
    }
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.jwt.secret);
}