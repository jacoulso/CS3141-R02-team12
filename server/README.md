## Development server

Typical CRUD style.

Run `npm start` for a dev server. Navigate to `http://localhost:3000/` to check it out. The app will automatically reload if you change any of the source files.

## Routes

### Users
-------------------------------------------------------
- ``` /singup ``` registers a new user and stores them in the database 
- ``` /login ``` validates a user based on a given username and password, returns a signed token
- ``` /authenticate ``` given a signed token, deconstructs and determines whether the user is who they say they are. Returns user information if they are valid
- ``` /delete ``` deletes a given user given a user ID
- ``` /update ``` updates a given users stored information given a new username, email, password, and confirmedPassword

### Calendars
-------------------------------------------------------
- ``` /calendars ``` gets all calendars associated with a user ID
- ``` /calendars/create ``` creates a new calendar with a given title and associates it with the given user ID
- ``` /calendars/remove ``` removes a specific calendar based on a given user ID and calendar ID
- ``` /calendars/calendar ``` gets a specific calendar based on a user ID and a calendar ID

### Friends
-------------------------------------------------------
- ``` /friends ``` gets all friends associated with your user ID
- ``` /friends/add ``` creates a friend associated with your user ID
- ``` /friends/get/username ``` gets a 'friend' based on an username
- ``` /friends/get/email ``` gets a 'friend' based on an email
- ``` /friends/remove ``` removes a specific association based on your uID and the friend uID

### Events
-------------------------------------------------------

- ``` /events/getAll ``` retrieves all the events related to a given user ID and calendar ID
- ``` /events/getOne ``` retrieves a specific event realted to a given user ID, calendar ID, and event ID
- ``` /events/delete ``` removes a specific event given a user ID, calendar ID, and an event ID
- ``` /events/add ``` creates a new event given an array of parameters. See this example:  
   ```javascript const NewEvent = [  
   creatorID: '1',  
   calendarID: '1',  
   colorID: '1',  
   title: 'ThisIs ATestEvent',  
   isAllDay: '1',  
   dateTimeStart: '2022-04-10 09:00:00',  // Must be in proper 'yyyy-mm-dd hh:mm:ss' format
   dateTimeEnd: '2022-04-30 10:00:00',  
   duration: '30',  
   location: 'Brrom closet',  
   eventTypeID: '1',  
   priorityID: '1',  
   description: "'give me worm or give me death'",  
   recurrence: 'MWF',  
   recurrenceEndDate: '2022-04-30 10:00:00'  
   ]```  
