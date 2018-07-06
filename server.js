var express=require('express');
var bodyParser = require('body-parser')
var https = require('https')
var app=express();
app.use(bodyParser.urlencoded({extended:false}))
var fs = require('fs')
const port = 3000
/*
   Here we are configuring our SMTP Server details.
   STMP is mail server which is responsible for sending and recieving email.
*/
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,POST");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});
app.use(express.static(__dirname + '/build'));

// app.get('/*', function(req, res){
//  res.sendFile('/build/index.html' ,{root:__dirname});
// });


const httpsOptions = {
 key: fs.readFileSync('./key.pem'),
 cert: fs.readFileSync('./cert.pem')
}

const server = https.createServer(httpsOptions, app).listen(port, () => {
 console.log('server running at ' + port)
})

/*--------------------Routing Over----------------------------*/

/*app.listen(3001,function(){
   console.log("Express Started on Port 3000");
});*/