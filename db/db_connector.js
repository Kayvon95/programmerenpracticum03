/**
 * Created by Kayvon Rahimi on 10-5-2017.
 */
var mysql = require('mysql');
var config = require('../config');

var pool = mysql.createPool({
    connectionLimit: 25,
    // connectTimeout  : 8 * 1000,
    // acquireTimeout   : 60 * 60 * 1000,
    // timeout         : 60 * 60 * 1000,
    host : config.dbHost,
    user : config.dbUser,
    password : config.dbPassword,
    database : config.dbDatabase,
    port : config.dbPort
});


// pool.connect( function(err) {
//     if( err ) {
//         console.log(err);
//     } else {
//         console.log("Connected to " + config.webPort + " : " + config.dbDatabase);
//     }
// });

pool.getConnection( function (err, conn){
    if (err) {
        console.log(err + "It no work.");
    } else {
        console.log("Connected to database '" + config.dbDatabase + "' on " + config.dbPort + '.');
    }
});

module.exports = pool;