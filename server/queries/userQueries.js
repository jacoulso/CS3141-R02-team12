const userQueries = {
    authenticateLogin: "SELECT * FROM Users WHERE username=?",
    signup: "CALL user_create (?,?,?)",
    deleteLogin: "",
    lookForOne: "SELECT uID, username, email FROM Users WHERE username=? OR email=? LIMIT 1"
  };
  module.exports = userQueries;