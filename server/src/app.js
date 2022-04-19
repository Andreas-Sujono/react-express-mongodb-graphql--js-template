import env from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import routes from './routes';
import makeDb from './makeDb';
env.config();

const app = express();

// Allow Cross-Origin requests
app.use(
  cors({
    origin: true, //This will just copy the request origin and put it in response
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// // Set security HTTP headers
// app.use(helmet()); //enable in production only, it disables the graphiql interface

// Limit request from the same API
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: 'Too Many Request from this IP, please try again in an hour',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: '15kb',
  })
);

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

//connect to DB
makeDb();

//start API routing heres
app.use('/api/v1', routes); // append nginx routing (if applicable)

app.use('/api/v1', (req, res) => {
  res.status(200).send({
    mode: process.env.NODE_ENV,
    success: true,
  });
});

export default app;
