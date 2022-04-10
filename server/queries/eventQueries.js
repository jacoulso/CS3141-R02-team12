const eventQueries = {
    getEvent: 'SELECT * FROM Events WHERE creatorID=? AND calendarID=? AND eID=?',
    getAllEvents: 'SELECT * FROM Events WHERE creatorID=? AND calendarID=?',
    addEvent: "INSERT INTO Events (creatorID,calendarID," +
                                    "colorID,title,isAllDay," +
                                    "dateTimeStart,dateTimeEnd,duration," +
                                    "location,eventTypeID,priorityID," +
                                    "description,recurrence,recurrenceEndDate)" + 
              "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    updateEvent: '',
    deleteEvent: ''
  };
  module.exports = eventQueries;

    