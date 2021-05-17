const mongoose = require('mongoose');
const db = process.env.DATABASE.replace(
  '<MONGO_PASSWORD>',
  process.env.MONGO_PASSWORD
);
mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('connected to local mongo server...');
    }
  }
);

const dbConn = mongoose.connection;
module.exports = dbConn;
