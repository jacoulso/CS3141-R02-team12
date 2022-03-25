const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
  res.send(`Node and express server running on port ${PORT}. Checkout '/status' to see how it's doing`)
})

app.get('/event/:eID/:uID', (req, res) => {
    const { eID, uID } = req.params;
    console.dir(`eID: ${eID}, uID: ${uID}`);
    res.send(`eID: ${eID}, uID: ${uID}`);
});

app.post('/event', (req, res) => {
    console.dir("Called event request...");
    res.send('Mega Worm test');
})

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
})
