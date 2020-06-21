const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.set('debug', true);
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;

const dbUri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0-r9qqm.gcp.mongodb.net/Portfolio?retryWrites=true&w=majority`;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

dbconnection = mongoose.connect(dbUri, options)
		.then(() => console.log(`Database connected`))
		.catch(err => console.log(`Database connection error: ${err.message}`));
