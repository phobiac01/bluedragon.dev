const express = require('express');
//const lg = require('logger');

const app = express();
const port = 80;
var startDate = new Date();

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

app.get('/*', (req, res) => {
	res.status(404).send('Not Found');
});


app.listen(port, () => {
	console.log('Dev Webserver started at: ' + startDate.toLocaleString());
	console.log(`] Listening at http://localhost:${port}`);
});



setTimeout(() => {
	console.log('\n] Stopping the server after 2 hours for security reasons.');
	process.exit(0);
}, 7200000);