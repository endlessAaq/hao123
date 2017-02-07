var mysql = require('mysql');
var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'LX199111159.',
    // password:'123456',
    database:'user'
    // database:'test'
});

function query(sql, callback) {
    pool.getConnection(function(err, connection) {
        connection.query(sql, function(err, rows) {
            if(err) throw err;

            callback(err, rows);
            connection.release();
        });
    });
}

exports.query = query;
