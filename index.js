const express = require('express')
const connectDB = require('./database')

const taskRoute = require('./routes/taskRoute')

const app = express()
const port = 3000

connectDB()

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/task', taskRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})