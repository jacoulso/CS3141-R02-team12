const userQueries = {
    getAllCalendars: "SELECT * FROM Calendars WHERE (SELECT cID FROM UserCalendarsLookup WHERE uID=?)",
    getOneCalendar: "SELECT * FROM Calendars WHERE cID=?",
    createNewCalendar: "CALL link_UserCal (?)",
    removeCalendar: ""
  };
  module.exports = userQueries;