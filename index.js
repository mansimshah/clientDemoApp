/*
*	Module dependencies
*/
var express     = 	   require('express');
var http 	    = 	   require('http');
var path        =  	   require('path');
var util 	    =      require('util');
var bodyParser  =      require('body-parser');
var jsonParser  =      bodyParser.json();
var logger      =      require('morgan');
var mongoose    =      require('mongoose');
var database    =      require('./config/database'); 	// Get configuration file
var static      =      require( 'serve-static' );
var app         =      express();
const router = express.Router();
const authentication = require('./routes/authentication')(router);
const blogs = require('./routes/blog')(router);
const cors = require('cors');

//Connection with Database
mongoose.connect(database.url);
var db = mongoose.connection;

app.use(cors({
	origin: 'http://localhost:4200'
}))

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser());

app.use( static( path.join( __dirname, '/dist/' )));
app.use('/authentication',authentication);
app.use('/blogs',blogs);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// It Will Start Server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});