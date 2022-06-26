const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/error', (req, res) => {
    console.error('CREATING ERROR?!?!?!');
    process.exit(1);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
