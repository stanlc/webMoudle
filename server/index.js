// const express = require('express')

// const app = express()
// app.use(require('cors')())
// app.use(express.json())

// require('./plugins/db')(app)
// require('./router/index')(app)

// app.listen(3000,()=>{
//     console.log('localhost:3000')
// })

const express = require('express')

const app = express()

app.use(require('cors')())
app.use(express.json())

require('./plugins/db')(app)
require('./router/index')(app)

app.listen(3001,()=>{
    console.log('localhost:3001')
})