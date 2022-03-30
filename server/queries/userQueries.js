const userQueries = {
    authenticateLogin: "SELECT uID, username, email FROM Users WHERE username=? AND password=?",
    addLogin: "INSERT INTO Users " ,
    deleteLogin: ""
  };
  module.exports = userQueries;