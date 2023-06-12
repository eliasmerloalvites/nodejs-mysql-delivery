const mysql = require('mysql');

/* const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'delivery'
}); */

const db = mysql.createConnection({
    host: 'localhost',
    user: 'delivery_elias_root',
    password: 'r#s1D4geOTKg',
    database: 'delivery_elias_udemy'
});

db.connect(function(err){
    if(err) throw err;
    console.log('DATABASE CONNECTED!');
});

module.exports = db;