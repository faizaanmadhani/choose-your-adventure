const express = require('express')
const app = express()
const port = 3000
const SERVER_STARTED = 'Server started on port: '

//Routes
const pageRouter = require('./controllers/pageRouter')

app.use('/story', pageRouter)

app.get('/', (req, res) => {
    res.send("Hello, World");
});

app.listen(port, () => {
    console.log(SERVER_STARTED + port);
});




