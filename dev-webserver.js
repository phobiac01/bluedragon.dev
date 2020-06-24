const express = require('express');
const lg = require('logger');

const app = express();
const port = 80;

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile('index.html');
});


app.get('/*', (req, res) => {
	res.status(404).send('Not Found');
});


app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
