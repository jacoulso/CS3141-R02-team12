const query = require('../queries/friendQueries');
const mysql = require(`mysql2`);
const config = require(`../config`);

// Startup
const db = mysql.createConnection(config.db);


// Create a new friend given their uID
exports.addFriend = async function (req, res) { }

// Get a friend given their username
exports.getFriendByUsername = async function (req, res) { }

// Get a friend given their email
exports.getFriendByEmail = async function (req, res) { }

// Remove a friend given your uID and their username
exports.removeFriend = async function (req, res) { }

// Get all friends related to your uID
exports.getAllFriends = async function (req, res) { }