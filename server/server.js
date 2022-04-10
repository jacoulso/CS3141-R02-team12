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

// Check status
app.get('/', (req, res) => {
    res.send(`Node and express server running`)
})

// Base routes for the various API's. See specific controllers for details
app.use('/', userRouter);
app.use('/calendars', calendarRouter);
app.use('/events', eventRouter);

//------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`***Listening on port ${PORT}...`)
})

