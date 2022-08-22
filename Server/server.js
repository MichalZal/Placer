const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => { console.log('listening on port ' + PORT) })
app.use(() => {console.log('hello')})
app.get('/', (req, res) => {
  res.json(200).send('hello')
})