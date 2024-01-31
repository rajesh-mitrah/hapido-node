import express from "express";
import userController from "../controllers/userController.js";
import { authenticateJWT } from "../middlewares/jwtToken.js";
import { ENDPOINTS, ERROR_MESSAGE, REGEX } from '../utils/constants.js';
import { validateRequest } from "../middlewares/expressValidator.js";
import { body, check, param } from "express-validator";

const router = express.Router();

router.get(
    ENDPOINTS.GET_USER_BY_ID,
    validateRequest([
        param('id').isAscii().withMessage(ERROR_MESSAGE.USER_ID_REQUIRED),
    ]),
    authenticateJWT,
    userController.getUserById
);

router.get(
    ENDPOINTS.GET_USER_BY_EMAIL,
    validateRequest([
        param('email').isEmail().withMessage(ERROR_MESSAGE.VALID_EMAIL),
    ]),
    authenticateJWT,
    userController.getUserByEmail
);

router.put(
    ENDPOINTS.UPDATE_USER,
    validateRequest([
        param('id').isAscii().withMessage(ERROR_MESSAGE.USER_ID_REQUIRED),
        check('firstName')
            .if(body('firstName').exists()) // check subfield only if 'firstName' exist
            .notEmpty().withMessage(ERROR_MESSAGE.FIRST_NAME_REQUIRED),
        check('lastName')
            .if(body('lastName').exists()) // check subfield only if 'lastName' exist
            .notEmpty().withMessage(ERROR_MESSAGE.LAST_NAME_REQUIRED)
    ]),
    authenticateJWT,
    userController.updateUser
);

router.get(
    ENDPOINTS.GET_ALL_USERS,
    userController.getAllUsers
);

router.get(
    ENDPOINTS.USER_SEARCH,
    userController.fetchAllUsers
)

router.delete(
    ENDPOINTS.DELETE_USER,
    authenticateJWT,
    userController.deleteUser
);

export default router;
