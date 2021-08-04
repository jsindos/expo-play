const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.get('/', function (req, res) {
  res.send({ name: 'Gabeee' })
})

app.listen(process.env.PORT || 8090)
