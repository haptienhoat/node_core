const express = require('express')
const connectDB = require('./database')
const cookieParser = require('cookie-parser')

const taskRoute = require('./routes/taskRoute')
const authRoute = require('./routes/authRoute')

const app = express()
const port = 3000

connectDB()

app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/task', taskRoute);
app.use('/auth', authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})