const express = require('express')
require('./config/database')
const port = 3030

const app =express()

app.use(express.json)
app.use('/api/v1',user)

app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
    
})