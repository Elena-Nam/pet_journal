console.log("Hello Node!");
require('dotenv').config();

const express = require('express');
const app = express();

// connect db
const connectDB = require('./db/connect')

//
const authMiddleware = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth')
const petsRouter = require('./routes/pets')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json());

//extra packages

//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/pets', authMiddleware, petsRouter)



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => 
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
      console.log(error);
  }
};

start();