const query = require('../queries/eventQueries');
const mysql = require(`mysql2`);
const config = require(`../config`);

// Startup
const db = mysql.createConnection(config.db);

// Retrieve all events related to a uID and a cID
exports.getAllEvents = async function (req, res) {
    console.log(`***Get all events requested...`);
    const uID = req.query.uID;
    const cID = req.query.cID;

    if (!uID) { // sanity check
        return res.status(422).json({ 'error': 'Please provide a valid user to look for.' });
    } else if (!cID) {
        return res.status(422).json({ 'error': 'Please provide a valid calendar to look in.' });
    }

    try {
        console.log(`***End of sanity check! Connecting to ${config.db.database}...`);
        // Open a connection
        db.connect((err) => {
            if (err) console.log(`Error connecting to ${config.db.database}: ${err}`);
        });

        db.query(query.getAllEvents, [uID, cID], async function (err, results) {
            if (err) console.log(`*****${err}`);

            if (results != null) { // If we found something, attempt to send json packet
                console.log(`***Event for 'uID: ${uID}, cID: ${cID}' found.`);
                res.send({
                    message: "Query ran successfully.",
                    data: results, // pass back query results
                    successCode: true
                });
            } else {
                console.log(`***No events for 'uID: ${uID}, cID: ${cID}' found.'`);
                res.send({
                    message: "Query ran successfully.",
                    data: "There are no events. Add one?", // pass back query results
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

// Retrieve a specific event based on a uID, cID, and eID
exports.getOneEvent = async function (req, res) {
    console.log(`***Get a specifc event requested...`);
    const { uID, cID, eID } = req.params;

    if (!uID) { // sanity check
        return res.status(422).json({ 'error': 'Please provide a valid user to look for.' });
    } else if (!cID) {
        return res.status(422).json({ 'error': 'Please provide a valid calendar to look in.' });
    } else if (!eID) {
        return res.status(422).json({ 'error': 'You have to give a specific event to look for you silly goose...' });
    }

    try {
        console.log(`***End of sanity check! Connecting to ${config.db.database}...`);
        // Open a connection
        db.connect((err) => {
            if (err) console.log(`Error connecting to ${config.db.database}: ${err}`);
        });

        db.query(query.getEvent, [uID, cID, eID], async function (err, results) {
            if (err) console.log(`*****${err}`);

            if (results != null) { // If we found something, attempt to send json packet
                console.log(`***Event 'eID: ${eID}' found.`);
                res.send({
                    message: "Query ran successfully.",
                    data: results, // pass back query results
                    successCode: true
                });
            } else {
                console.log(`***No event 'eID: ${eID}' found.'`);
                res.send({
                    message: "Query ran successfully.",
                    data: "This event doesn't exist. Add one?", // pass back query results
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

// Adds an event with the given form data
exports.addEvent = async function (req, res) {
    console.log(`***Create an event requested...`);

    // Create an alias for this madness
    const newEvent = { creatorID, calendarID, colorID, title, 
        isAllDay, dateTimeStart, dateTimeEnd, duration, location, 
        eventTypeID, priorityID, description, recurrence, recurrenceEndDate } = req.body;
    console.log(newEvent);
    //sanity check pls, only on what matters th
    if (!creatorID)     return res.status(422).json({ 'error': `Please provide a valid creatorID.` });
    if (!calendarID)    return res.status(422).json({ 'error': `Please provide a valid calendarID.`});
    // if (!colorID)       return res.status(422).json({ 'error': `Please provide a valid colorID.`});
    if (!title)         return res.status(422).json({ 'error': `Please provide a valid title.`});
    if (isAllDay == null)return res.status(422).json({ 'error': `Please provide a valid isAllDay.`});
    if (!eventTypeID)   return res.status(422).json({ 'error': `Please provide a valid eventTypeID.`});
    // if (!priorityID)    return res.status(422).json({ 'error': `Please provide a valid priorityID.`});
    if (!description)   return res.status(422).json({ 'error': `Please provide a valid description.`});
    // if (!recurrence)    return res.status(422).json({ 'error': `Please provide a valid recurrence.`});

    try { // If by the grace of the gods we passed the sanity check, create the thing
        console.log(`***End of sanity check! Connecting to ${config.db.database}...`);
        // Open a connection
        db.connect((err) => {
            if (err) console.log(`Error connecting to ${config.db.database}: ${err}`);
        });

        db.query(query.addEvent, [creatorID, calendarID, colorID, title, 
            isAllDay, dateTimeStart, dateTimeEnd, duration, location, 
            eventTypeID, priorityID, description, recurrence, recurrenceEndDate], async function (err, results) {
            if (err) console.log(`*****${err}`);

            if (results != null) { // If we found something, attempt to send json packet
                console.log(`***Event 'title: ${title}' created.`);
                res.send({
                    message: "Query ran successfully.",
                    data: results, // pass back query results
                    successCode: true
                });
            } else {
                console.log(`***Create event 'title: ${title}' aborted.`);
                res.send({
                    message: "Query ran successfully.",
                    data: results, // pass back query results
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

// Update an exisitng event from data
exports.updateEvent = async function (req, res) {
    res.status(200).json({ 'message': 'Backend not implemented yet.' });
}
 
// Delete an event given an eID
exports.deleteEvent = async function (req, res) {
    res.status(200).json({ 'message': 'Backend not implemented yet.' });
}

function sanityCheck(res, attribute) {
    console.log(`*Checking ${attribute}...`);
    if (!attribute) return false;
    return true;
}