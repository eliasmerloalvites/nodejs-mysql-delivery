const mysql = require('mysql2');

/* const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'delivery'
}); */

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'delivery',
    port: process.env.DB_PORT || 3306
});

db.connect(function(err){
    if(err) throw err;
    console.log('DATABASE CONNECTED!');
});


module.exports = db