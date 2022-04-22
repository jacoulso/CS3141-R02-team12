const userQueries = {
    getAllCalendars: "CALL cal_getAll (?)",
    getOneCalendar: "SELECT * FROM Calendars WHERE cID=?",
    createNewCalendar: "CALL cal_Create (?,?)",
    removeCalendar: ""
  };
  module.exports = userQueries;