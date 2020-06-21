// Application Variables
const express = require('express');
const createError = require('http-errors');
const http = require('http');
const path = require('path');
const chalk = require('chalk');
const pkg = require('./package.json');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
const dbConnect = require('./dbconnection');
const app = express();

// Set options for server
const start = Date.now(),
		protocol = process.env.PROTOCOL || 'http',
		port = process.env.PORT || '3000',
		host = process.env.HOST || 'localhost';

let server;

function sendBootStatus(status) {
	if (!process.send) {
		return;
	}
	process.send({ boot: status });
}

// View engine setup - Expressjs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'Cats are cool',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}));
app.use(flash());
app.use(methodOverride("_method"));

app.use(function(req, res, next){
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

// Path to Routes
const indexRouter = require('./routes/index');

// Use Router
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// Write status to console
console.log(chalk.yellow('%s booted in %dms - %s://%s:%s'), pkg.name, Date.now() - start, protocol, host, port);

// Start HTTP Server
if (protocol === 'http'){
	server = http.createServer(app);
}
server.listen({ port, host }, function (req, res) {
	// Tell the parent process that the Server has booted
	sendBootStatus ('ready');
});

module.exports = app;