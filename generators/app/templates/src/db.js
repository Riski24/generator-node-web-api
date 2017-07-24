import Promise from 'bluebird'
import mongoose from 'mongoose'

// Set mongoose to use Bluebird's promise library
mongoose.Promise = Promise

export default function Db({ DB_PORT, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_AUTH_SOURCE }) {
  const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
  const db = mongoose.createConnection(connectionString, {
    user: DB_USER,
    pass: DB_PASS,
    auth: {
      authSource: DB_AUTH_SOURCE
    }
  })

  // Place any additional initialization code here

  return db
}
