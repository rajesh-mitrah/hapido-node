import express from 'express';
import { body } from 'express-validator';

import { jwtSign } from '../middlewares/jwtToken.js';
import passport from '../middlewares/passport.js';
// import authController from '../controllers/auth.controller.js';
import {
	ENDPOINTS,
	REGEX,
	STATUS,
	SUCCESS_MESSAGE
} from '../utils/constants.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import { successHandler } from '../middlewares/successHandler.js';
import { validateRequest } from '../middlewares/expressValidator.js';
import authController from '../controllers/authController.js';

const router = express.Router();

router.post(
	ENDPOINTS.REGISTER,
	validateRequest([
		// body('firstName').isAlphanumeric().withMessage('Firstname must be valid'),
		// body('lastName').isAlphanumeric().withMessage('Lastname must be valid'),
		body('email').isEmail().withMessage('Email must be valid'),
		body('password').matches(REGEX.PASSWORD).withMessage('Password must be of 8 characters including 1 uppercase, 1 lowercase, 1 special character(!@#$%^&*) and 1 number'),
	]),
	authController.register
);

router.post(
	ENDPOINTS.LOGIN,
	validateRequest([
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.matches(REGEX.PASSWORD)
			.withMessage(
				'Incorrect Password'
			)
	]),
	(req, res, next) => {
		passport.authenticate('local', (err, user, info) => {
			if (err) return next(err);
			if (!user) {
				// Authentication failed
				return errorHandler(STATUS.NOT_AUTHENTICATED.CODE, res);
			}
			// Authentication succeeded
			req.logIn(user, async err => {
				const dataObj = {
					email: user.email,
					role: user.role
				};
				const token = await jwtSign(dataObj);
				user.token = token;
				if (err) {
					return next(err);
				} else {
					let message = SUCCESS_MESSAGE.LOGIN_SUCCESS;
					return successHandler(STATUS.SUCCESS.CODE, res, {
						message,
						data: user
					});
				}

			});
		})(req, res, next);
	}
);

export default router;
