const query = require('../queries/calendarQueries');
const mysql = require(`mysql2`);
const config = require(`../config`);

// Startup
const db = mysql.createConnection(config.db);

// Create a new calendar given a new calendar title
exports.createNewCalendar = async function (req, res) {
    console.log(`***New calendar creation requested...`);
    const { uID, title } = req.body;

    if (!title) { // sanity check
        return res.status(422).json({ 'error': 'Please provide a valid title.' });
    }

    try {
        console.log(`***End of sanity check! Connecting to ${config.db.database}...`);
        // Open a connection
        db.connect((err) => {
            if (err) console.log(`Error connecting to ${config.db.database}: ${err}`);
        });

        db.query(query.createNewCalendar, [uID, title], async function (err, results) {
            if (err) console.log(`*****${err}`);

            if (results != null) { // If we found something, attempt to send json packet
                console.log(`***Calendar '${title}' created.`);
                res.send({
                    message: "Query ran successfully.",
                    data: results, // pass back query results
                    successCode: true
                });
            } else {
                console.log(`***Failed to create calendar '${title}.'`);
                res.send({
                    message: "Query ran successfully.",
                    data: "Calendar creation failed. Try again??", // pass back query results
                    successCode: false
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(403).json({
            success: false,
            message: err
        })
    }
}
// Removes a specific calendar based on a given calendar ID
exports.removeCalendar = async function (req, res) {
    res.status(200).json({ 'message': 'Backend not implemented yet.' });
}

// Get a specific calendar based on a uID and a cID
exports.getOneCalendar = async function (req, res) {
    console.log(`***Retrieve specifc calendar requested...`);
    const { uID, cID } = req.query;

    if (!uID) { // sanity check
        return res.status(422).json({ 'error': 'Please provide a valid user ID.' });
    } else if (!cID) {
        return res.status(422).json({ 'error': 'Please provide a valid calendar ID.' });
    }

    try {
        console.log(`***End of sanity check! Connecting to ${config.db.database}...`);
        // Open a connection
        db.connect((err) => {
            if (err) console.log(`Error connecting to ${config.db.database}: ${err}`);
        });

        db.query(query.getOneCalendar, [cID, uID], async function (err, results) {
            if (err) console.log(`*****${err}`);

            if (results != null) { // If we found something, attempt to send json packet
                console.log(`***Found a calendar for 'uID: ${uID}, cID: ${cID}'.`);
                res.send({
                    message: "Query ran successfully.",
                    data: results, // pass back query results
                    successCode: true
                });
            } else {
                console.log(`***Failed to locate calendar for 'uID: ${uID}, cID: ${cID}'.`);
                res.send({
                    message: "Query ran successfully.",
                    data: "No such calendar found. Try again??", // pass back query results
                    successCode: false
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(403).json({
            success: false,
            message: err
        })
    }
}

// Get all calendars associated with a uID
exports.getAllCalendars = async function (req, res) {
    console.log(`***GET all calendars requested...`);
    const uID = req.query.uID;

    if (!uID) { // sanity check
        return res.status(422).json({ 'error': 'Please provide a valid user ID.' });
    }

    try {
        console.log(`***End of sanity check! Connecting to ${config.db.database}...`);
        // Open a connection
        db.connect((err) => {
            if (err) console.log(`Error connecting to ${config.db.database}: ${err}`);
        });

        db.query(query.getOneCalendar, [uID], async function (err, results) {
            if (err) console.log(`*****${err}`);

            if (results != null) { // If we found something, attempt to send json packet
                console.log(`***Found calendars for 'uID: ${uID}'.`);
                res.send({
                    message: "Query ran successfully.",
                    data: results, // pass back query results
                    successCode: true
                });
            } else {
                console.log(`***Failed to locate calendars for 'uID: ${uID}'.`);
                res.send({
                    message: "Query ran successfully.",
                    data: "User has no calendars. Are they real?", // pass back query results
                    successCode: false
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(403).json({
            success: false,
            message: err
        })
    }
}