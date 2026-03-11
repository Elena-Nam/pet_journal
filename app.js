require('dotenv').config();
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const path = require('path');
const express = require('express');
const app = express();

// connect db
const connectDB = require('./db/connect')

// authentication
const authMiddleware = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth')
const petsRouter = require('./routes/pets')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}))

app.use(express.json());

// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
//   setHeaders: (res, path) => {
//     // This tells the browser it’s safe to load from another origin
//     res.set('Cross-Origin-Resource-Policy', 'cross-origin');
//   }
// }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
  setHeaders: (res, path) => {
    // Allow cross-origin resource access
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

// security
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(cors({
  origin: 'http://localhost:5173', // React frontend URL
  credentials: true, // if sending cookies or Authorization headers
}));

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