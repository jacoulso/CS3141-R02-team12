const userQueries = {
    getAllCalendars: "SELECT * FROM Calendars WHERE (SELECT cID FROM UserCalendarsLookup WHERE uID=?)",
    getOneCalendar: "SELECT * FROM Calendars WHERE cID=?"
  };
  module.exports = userQueries;