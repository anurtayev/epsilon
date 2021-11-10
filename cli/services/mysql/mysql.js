const mysql = require("mysql");

var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

function connect() {
  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);
  });
}

function write() {
  connection.query("SELECT 1 + 1 AS solution", function (error, results) {
    if (error) throw error;
    console.log("The solution is: ", results[0].solution);
  });
}

function disconnect() {
  connection.end();
}

module.exports = { connect, write, disconnect };
