const express = require('express');
const cors = require(`cors`);
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');
const calendarRouter = require('./routes/calendarRoutes');
const eventRouter = require('./routes/eventRoutes');

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({extended: true})); // enables form posting
app.use(bodyParser.json());
const PORT = 3000;


// ---- Routes ------------------------- 

// Base routes for the various API's. See specific controllers for details
app.use('/calendars', calendarRouter);
app.use('/events', eventRouter);
app.use('/', userRouter);

//------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`***Listening on port ${PORT}...`)
})

