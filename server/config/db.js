const mongoose = require('mongoose')
require('dotenv').config({ path: './config.env' })

const connectToMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI, () => {
    console.log('Connected to mongoDB successfully')
  })
}

module.exports = connectToMongo
