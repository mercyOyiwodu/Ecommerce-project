require('./config/database')
const express = require('express')
require('dotenv').config()
const cors = require('cors')

const PORT = process.env.PORT || 3030

const userRouter = require('./routes/user')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1',userRouter)

app.listen(PORT,()=>{
    console.log(`server is listening to port ${PORT}`);
    
})