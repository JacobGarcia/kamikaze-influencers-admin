const express = require('express')
const helmet = require('helmet')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 8080

app.use(helmet())

app.use('/static', express.static(path.resolve('static')))
app.use('/dist', express.static(path.resolve('dist')))

app.use('*', (req, res) => {
    res.sendFile(path.resolve('src/index.html'))
})

app.listen(PORT, () => {
  console.log(`Influencers server listening [${process.env.NODE_ENV}] on port ${PORT}! `)
})
