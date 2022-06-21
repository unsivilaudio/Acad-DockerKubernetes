const express = require('express');

const app = express();

app.get('/greet', (req, res) => {
    res.send('How are you today?');
});

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(3000, console.log.bind(null, 'Listening on port 3000'));
