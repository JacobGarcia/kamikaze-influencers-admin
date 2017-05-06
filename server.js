const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
const auth = require('http-auth') //authentication module
const app = express()


const basic = auth.basic({
	realm: "Simon Area.",
	file: "./config/users.htpasswd"
});

const API = require(path.resolve('routers/v1/api.js'))

const PORT = process.env.PORT || 8080

app.use(helmet())

app.use(auth.connect(basic))

app.use('/static', express.static(path.resolve('static')))
app.use('/dist', express.static(path.resolve('dist')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/v1', API) //Add api routes

app.use('*', (req, res) => {
    res.sendFile(path.resolve('src/index.html'))
})


app.listen(PORT, () => {
  console.log(`Influencers server listening [${process.env.NODE_ENV}] on port ${PORT}! `)
})
