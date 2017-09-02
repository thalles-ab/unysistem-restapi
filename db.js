import mongoose from "mongoose";
const config = require("./libs/config");

mongoose.createConnection(config.mongourl, config.mongoconfig).then(
    () => { console.log('conectado mongodb - talentoses'); },
    err => { throw err; }
);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
