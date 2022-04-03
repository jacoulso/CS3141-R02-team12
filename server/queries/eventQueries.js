const eventQueries = {
    getEvent: 'SELECT * FROM Events WHERE eID=? AND creatorID=?',
    addEvent: "INSERT INTO Events (creatorID,calendarID," +
                                    "colorID,title,isAllDay," +
                                    "dateTimeStart,dateTimeEnd," +
                                    "location,eventTypeID,priorityID," +
                                    "description,recurrence,recurrenceEndDate)" + 
              "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
    updateEvent: '',
    deleteEvent: ''
  };
  module.exports = eventQueries;

    