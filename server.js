require('./config/database')
const express = require('express')
require('dotenv').config()
const cors = require('cors')

const PORT = process.env.PORT || 3030

const userRouter = require('./routes/user')
const productRouter = require('./routes/productRouter')
const womenRouter = require('./routes/womenRouter')
const cartRoute = require("./routes/cartRoute")
const paymentRouter = require("./routes/paymentRouter")



const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1',userRouter)
app.use('/api/v1',productRouter)
app.use('/api/v1',womenRouter)
app.use('/api/v1', cartRoute)
app.use('/api/v1', paymentRouter)



const swaggerJsdoc = require("swagger-jsdoc");
const swagger_UI = require("swagger-ui-express")

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'BASE_URL: https://swagger-app.onrender.com',
//       version: '1.0.0',
//     },
//   },
//   apis: ["./routes/*.js"], // files containing annotations as above
//   components: {securitySchemes: {BearerAuth:{type: "http", scheme: "bearer", bearerFormat: "JWT"}},security: [{BearerAuth: []}]}
// };
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BASE_URL: https://ecommerce-project-m2bb.onrender.com',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
           bearerFormat: "JWT"
        }
      }
    }, 
    security: [{ BearerAuth: [] }]
  },
  apis: ["./routes/*.js"] // Ensure this points to the correct path
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/documentation", swagger_UI.serve, swagger_UI.setup(openapiSpecification))




app.listen(PORT,()=>{
    console.log(`server is listening to port ${PORT}`);
    
})