import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

import { port } from './config/index.js';
import router from './routes/index.js';
import passport from './middlewares/passport.js';


const app = express();

// parsing the POST data to req.body
app.use(express.json()); // parse the content-type application/JSON
app.use(express.urlencoded({ extended: true })); // parse the content-type application/x-www-form-urlencoded
// extended true will use qs and allow nested object data. false will use query-string and not supports nested object.

app.use(cors());

app.use(session({ 
	secret: process.env.SESSION_SECRET, 
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/api', router); // this will call for all the requests

app.listen(port.port, async () => {
	try {
		console.log(`server running on port ${port.port}!`);
	} catch (error) {
		console.log('app.listen error', error);
	}
});
