const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use('/api', require('./api'))

function start() {
    app.listen(PORT, () => {
        console.log('Server is started')
    })
}

start()
