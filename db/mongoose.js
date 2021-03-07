require('dotenv/config');

const mongoose = require('mongoose');
const connection = process.env.DB_URL;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Conneted Successfully"))
    .catch(err => console.log(err)); 