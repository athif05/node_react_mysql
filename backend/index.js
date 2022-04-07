const express = require('express');
const cors = require('cors');
const connection = require('./db/config');
const app = express();

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

app.use(express.json());
app.use(cors());

app.get('/backend', (req, res)=>{
    res.send('App is working...');
});

app.post('/register', async (req, res)=>{
    //res.send(req.body);

    const data = req.body;
    console.warn(data);

    var name=req.body.name;
	var email=req.body.email;
	var password=req.body.password;

	var sql = `INSERT INTO users (name, email, password) VALUES ("${name}", "${email}", "${password}")`;
  	connection.query(sql, function(error, result) {
		
		if(error) throw error;
		
		res.send(result);

		console.log("1 record inserted");

	});

});


app.post("/login", async (req, res)=>{

	const data = req.body;
    console.warn(data);

	var email=req.body.email;
	var password=req.body.password;

	connection.query("select id, name, email from users where email=? and password=?",[email, password], (error, result)=>{
		if(result.length > 0){

			/*Jwt.sign({result}, jwtKey, { expiresIn: "2h"}, (error, token) => {
				if(error){
					res.send([{name: "SomeThings went wrong..."}]);
				}
				res.status({result, auth:token});
			}); */

			res.send(result);
		} else {
			res.send([{name: "No record found"}]);
		}
	});
});


app.post('/add-product', async (req, res)=>{

    const data = req.body;
    console.warn(data);

    var name=req.body.name;
	var price=req.body.price;
	var category=req.body.category;
	var userId=req.body.userId;
	var company=req.body.company;

	var sql = `INSERT INTO products (name, price, category, userId, company) VALUES ("${name}", "${price}", "${category}", "${userId}", "${company}")`;
  	connection.query(sql, function(error, result) {
		
		if(error) throw error;
		
		res.send(result);

		console.log("1 product inserted");

	});

});


app.get("/products", async (req, res)=>{

	connection.query("select * from products", (error, result)=>{
		if(result.length > 0){
			res.send(result);
		} else {
			res.send([{name: "No record found"}]);
		}
	});
});

app.delete("/product/:id", (req, res)=>{

	//res.send(req.params.id);
	connection.query("DELETE from products where id="+req.params.id,(error, result)=>{
			if(error) throw error;
			res.send(result);
		}
	);
});

app.get("/product/:id", (req, res)=>{

	connection.query("SELECT * from products where id="+req.params.id, (error, result)=>{
		if(result.length > 0){
			res.send(result);
		} else {
			res.send([{name: "No record found"}]);
		}
	});
});


app.put("/update-product/:id", async (req, res)=>{

	//res.send('update data here');

	const data = req.body;
    console.log(data);

	var name=req.body.name;
	var price=req.body.price;
	var category=req.body.category;
	var company=req.body.company;

	var sql = `UPDATE products set name="${name}", price="${price}", category="${category}", company="${company}" where id="${req.params.id}"`;
  	connection.query(sql, function(error, result) {
		if(error) throw error;

		res.send(result);
		
	});

});

app.get("/search/:key", (req, res)=>{

	connection.query(`SELECT * from products where name REGEXP "${req.params.key}" or category REGEXP "${req.params.key}" or company REGEXP "${req.params.key}" or price REGEXP "${req.params.key}" `, (error, result)=>{
		if(result.length > 0){
			res.send(result);
		} else {
			res.send([{name: "No record found"}]);
		}
	});

});

app.listen(4200);