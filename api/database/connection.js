// Connection to MongoDB Database in server
const mongoose = require('mongoose');

// Credentials to connect to DB
const credentials = {
    server: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    auth: process.env.DB_AUTH
}

// URL to the DB
const connectionUrl = `mongodb://${credentials.server}:${credentials.port}/${credentials.database}`;
// Options for connect to the DB
const connectionOptions = {
    useNewUrlParser: true,
    autoReconnect: true,
    useFindAndModify: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    auth: {
        authSource: credentials.auth
    },
    user: credentials.user,
    pass: credentials.password
};

// Connection with the DB
mongoose.connect(connectionUrl, connectionOptions);
const db = mongoose.connection;

// Status tracker
// Successfully connected to DB
db.on('connected', function() {
    console.log(`Connected to ${credentials.database} for user ${credentials.user}`);
});
// Disconnected to DB
db.on('disconnected', function () {
    console.log(`Disconnected to ${credentials.database}`);
});
// Connection error to DB
db.on('error', function (error) {
    console.error.bind(console, 'Connection error: ')
});
// Connection close to DB by finishing the process
process.on('SIGINT', function () {
    db.close( function() {
        console.log(`Connection to ${credentials.database} closed due to process termination`);
        process.exit(0);
    });
});

module.exports = db;
