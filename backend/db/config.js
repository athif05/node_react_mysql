const mysql = require('mysql');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "node_react"
});
 
//connect to DB
connection.connect(function(error){
	if(error) throw error
		else console.log("connected to database successfully");
});

module.exports = connection;