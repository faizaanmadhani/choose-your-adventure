const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 8080;
const SERVER_STARTED = 'Server started on port: ';

//Routes
const pageRouter = require('./controllers/pageRouter');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/story', pageRouter);

app.get('/', (req, res) => {
	res.send('Hello, World');
});

app.listen(port, () => {
	console.log(SERVER_STARTED + port);
});
