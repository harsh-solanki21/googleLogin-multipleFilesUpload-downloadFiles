const express = require('express')
const path = require('path')
const cors = require('cors')
const connectToMongo = require('./config/db')
require('dotenv').config({ path: './config.env' })
const fileRoutes = require('./routes/fileRoutes')

connectToMongo()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

// It exposes the folder to the public
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// routes
app.use(fileRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server is up and running on ${port}`)
})
