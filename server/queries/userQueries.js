const userQueries = {
    authenticateLogin: "SELECT * FROM Users WHERE username=?",
    signup: "CALL user_create (?,?,?)",
    deleteLogin: ""
  };
  module.exports = userQueries;