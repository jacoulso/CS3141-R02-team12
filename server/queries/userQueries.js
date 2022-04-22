const userQueries = {
    authenticateLogin: "SELECT * FROM Users WHERE username=?",
    authenticateLoginUID: "SELECT * FROM Users WHERE uID=?", // For internal use only
    signup: "CALL user_create (?,?,?)",
    deleteLogin: "",
    lookForOne: "SELECT uID, username, email FROM Users WHERE username=? OR email=? LIMIT 1",
    updatePassword: "UPDATE Users SET password=? WHERE uID=?"
  };
  module.exports = userQueries;