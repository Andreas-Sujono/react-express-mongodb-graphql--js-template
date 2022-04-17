import mongoose from 'mongoose';

const isProduction = process.env.NODE_ENV === 'production';

//DB URI: mongodb://andreas:andreas@165.22.0.89:27020
function makeDatabaseURL() {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME = isProduction ? 'mongo' : MONGO_HOSTNAME,
    MONGO_PORT = isProduction ? 27017 : MONGO_PORT,
    MONGO_DB = 'admin',
  } = process.env;
  const DATABASE_URI =
    process.env.DATABASE_URI ||
    `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
  return DATABASE_URI;
}

function makeDatabaseOptions() {
  const options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true,
  };

  return options;
}

async function makeDb() {
  const DATABASE_URL = makeDatabaseURL();
  const DATABASE_OPTIONS = makeDatabaseOptions();

  console.log('DATABASE_URL: ', DATABASE_URL);
  const isNotConnected = mongoose.connection.readyState == 0;
  if (isNotConnected) {
    console.log('Setting up database...');
    await mongoose.connect(DATABASE_URL, DATABASE_OPTIONS);
    console.log('Successfully connected to DB');
  }

  return mongoose;
}

export default makeDb;
