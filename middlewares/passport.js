import passport from 'passport';
import { ComparePassword } from './passwordHasing.js';
import dbClient from '../dbHelper/index.js';
import LocalStrategy from 'passport-local';
import { ERROR_MESSAGE } from '../utils/constants.js';

const customFields = {
	usernameField: 'email',
	passwordField: 'password'
};

const verifyCallback = async (email, password, done) => {	
	try {
		const [results] = await dbClient.query(`SELECT * FROM users WHERE email=?`,[email])

		if (results.length == 0) {
			return done(null, false, { message: ERROR_MESSAGE.ACCOUNT_NOT_RECOGNIZED });
		}
		const isValid = await ComparePassword(
			password,
			results[0].password_hash
		);
		const user = {
			id: results[0].user_id,
			email: results[0].email,
			firstName: results[0].first_name,
			lastName: results[0].last_name,
			role: results[0].role,
		};

		if (isValid) {
			return await done(null, user);
		} else {
			return done(null, false, { message: ERROR_MESSAGE.INCORRECT_PASSWORD });
		}
		
	} catch (error) {
		return done(error);
	}	
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

export default passport;
