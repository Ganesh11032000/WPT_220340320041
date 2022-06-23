
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');

const conn = mysql.createConnection({
	host: 'localhost',
	user: 'Ganesh',
	password: 'cdac',
	database: 'pune',
	port: 3306
});





app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



var result;




app.get('/poc2', function (req, res) {


	console.log("reading input " + req.query.bid);
	let output = { bstatus: false, book: { bid: "", bname: "", bprice: "" } };

	conn.query("select bookid,bookname,bookprice from book where bookid=?;", [req.query.bid],
		(err, res1) => {
			if (err) {
				result = err;
				console.log("trouble " + err);
			} else {
				
				if (res1.length>0) {
					console.log(res1);
					output.bstatus = true;
					output.book = res1[0];
					res.send(output);
				} else {
					res.send(output);

				}
			}


		});




});


app.get('/poc3', function (req, res) {


	console.log("reading input " + req.query.bid+" "+req.query.bprice);
	let output = { bstatus: false};

	conn.query("update book set bookprice=? where bookid=?;",
	 [req.query.bprice,req.query.bid],
		(err, res1) => {
			if (err) {
				result = err;
				console.log("trouble " + err);
			} else {
				
				if (res1.affectedRows>0) {
					console.log(' inif');
					output.bstatus = true;
					
					res.send(output);
				} else {
					console.log( "inelse");
					res.send(output);

				}
			}


		});




});





app.listen(1000, function () {
	console.log("server listening at port 8081...");
});