const userQueries = {
    authenticateLogin: "SELECT uID, username, email FROM Users WHERE username=? AND password=?",
    signup: "CALL PROCEDURE user_create (?,?,?)",
    deleteLogin: ""
  };
  module.exports = userQueries;