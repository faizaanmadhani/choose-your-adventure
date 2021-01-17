const express = require('express')
const app = express()
const helmet = require('helmet')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3000
const SERVER_STARTED = 'Server started on port: '

//Routes
const pageRouter = require('./controllers/pageRouter')

//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(session({ secret: 'S3CRE7', resave: true, saveUninitialized: true }))
app.use(cors())
app.use(express.json())

app.use('/story', pageRouter)

app.get('/', (req, res) => {
    res.send("Hello, World");
});

app.listen(port, () => {
    console.log(SERVER_STARTED + port);
});




