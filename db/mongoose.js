const mongoose = require('mongoose');
const connection = "mongodb+srv://nyanase:supremenow-nvma@supremenow-api-cluster.pm20k.mongodb.net/supremeNow?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Conneted Successfully"))
    .catch(err => console.log(err)); 